require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('./components/authmiddleware/verifyToken');
const cloudinary = require('cloudinary').v2;
const port = process.env.PORT || 3000;




//middlewares:
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGO_PASSWORD}@learning-server.eft4uy8.mongodb.net/?appName=learning-server`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//cloudinary config:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

//taking in the middle in-memory buffer and streaming it to the cloudinary:
const uploadTocloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "portfolio-images" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

async function run() {
    try {
        await client.connect();
        const portfolio = client.db("portfolio");
        const feedbackCollection = portfolio.collection("feedback");
        const clientCollection = portfolio.collection("clients");
        const projectCollection = portfolio.collection("projects");
        const userCollection = portfolio.collection("users");
        const careearCollection = portfolio.collection("career");


        //auth related api's:
        app.post("/login", async (req, res) => {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({ message: "email and password are required" });
            };

            try {
                const user = await userCollection.findOne({ email });
                if (!user) {
                    return res.status(401).send({ message: "invalid email or password" });
                };

                const passwordMatches = await bcrypt.compare(password, user.passwordHash);
                if (!passwordMatches) {
                    return res.status(401).send({ message: "invalid email or password" });
                }


                const token = jwt.sign(
                    { email: user.email, id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "22d" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 22 * 24 * 60 * 60 * 1000,
                }).send({ message: "logged in" });
            } catch (error) {
                res.status(500).send({ message: "log in failed" });
            };
        });


        app.post("/logout", (req, res) => {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            }).send({ message: "logged out" });
        });

        app.get("/me", verifyToken, async (req, res) => {
            const user = await userCollection.findOne(
                { email: req.decodedUser.email },
                { projection: { passwordHash: 0 } },
            );

            res.send(user);
        });

        app.post("/update-profile", verifyToken, upload.single("image"), async (req, res) => {
            const { name } = req.body;
            const updatedField = {};

            if (name) {
                updatedField.name = name;
            };

            if (req.file) {
                try {
                    const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                    updatedField.profilePicture = cloudinaryResult.secure_url;
                } catch (error) {
                    return res.status(500).send({ message: "unable to upload profile picture" })
                }
            };

            if (Object.keys(updatedField).length === 0) {
                return res.status(400).send({ message: "nothing to update" });
            };

            try {
                await userCollection.updateOne(
                    { email: req.decodedUser.email },
                    { $set: updatedField },
                );
                res.send({ message: "profile updated", ...updatedField })
            } catch (error) {
                res.status(500).send({ message: "unable to update profile" })
            }
        })

        //password update related api:
        app.patch("/change-password", verifyToken, async (req, res) => {
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).send({ message: "current and new password are required" });
            };

            if (newPassword.length < 8) {
                return res.status(400).send({ message: "new password must be at least 8 character long" });
            };

            try {
                const user = await userCollection.findOne({ email: req.decodedUser.email });

                if (!user) {
                    return res.status(400).send({ message: "user not found!" });
                };

                const passwordMatches = await bcrypt.compare(currentPassword, user.passwordHash);
                if (!passwordMatches) {
                    return res.status(401).send({ message: "current password is incorrect" });
                };

                const newHash = await bcrypt.hash(newPassword, 12);
                await userCollection.updateOne(
                    { email: req.decodedUser.email },
                    { $set: { passwordHash: newHash } }
                );

                res.send({ message: "password updated" });
            } catch (error) {
                res.status(500).send({ message: "unable to update password." });
            };
        });


        //projects related apis:
        app.get("/projects", async (req, res) => {
            const projects = await projectCollection.find().sort({ createdAt: -1 }).toArray();
            if (projects.length === 0) {
                return res.status(404).send({ message: "No Projects to Show" })
            };
            res.send(projects);
        });

        //project posting api:
        app.post("/projects", verifyToken, upload.fields([
            { name: "image", maxCount: 1 },
            { name: "screenshots", maxCount: 5 },
        ]), async (req, res) => {
            const thumbnailFile = req.files?.image?.[0];
            const screenshotFiles = req.files?.screenshots || [];

            if (!thumbnailFile) {
                return res.status(400).send({ message: "thumbnail image is required" });
            };

            try {
                const thumbnailResult = await uploadTocloudinary(thumbnailFile.buffer);

                const screenshotResults = await Promise.all(
                    screenshotFiles.map((file) => uploadTocloudinary(file.buffer))
                );

                const projectDoc = {
                    name: req.body.name,
                    description: req.body.description,
                    livelink: req.body.livelink,
                    gitLink: req.body.gitLink,
                    teckStack: req.body.teckStack,
                    thumbNail: thumbnailResult.secure_url,
                    screenshots: screenshotResults.map((r) => r.secure_url),
                    createdAt: new Date(),
                };

                const result = await projectCollection.insertOne(projectDoc);
                res.status(201).send({ message: "project added", id: result.insertedId });
            } catch (error) {
                res.status(500).send({ message: "unable to post" });
            }
        })

        //project updating api:
        app.patch("/projects/:id", verifyToken, upload.fields([
            { name: "image", maxCount: 1 },
            { name: "screenshots", maxCount: 5 },
        ]), async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const updatedFields = {};
            if (req.body.name) updatedFields.name = req.body.name;
            if (req.body.description) updatedFields.description = req.body.description;
            if (req.body.livelink) updatedFields.livelink = req.body.livelink;
            if (req.body.gitLink) updatedFields.gitLink = req.body.gitLink;
            if (req.body.teckStack) updatedFields.teckStack = req.body.teckStack;

            try {
                const newThumbnail = req.files?.image?.[0];
                if (newThumbnail) {
                    const thumbnailResult = await uploadTocloudinary(newThumbnail.buffer);
                    updatedFields.thumbNail = thumbnailResult.secure_url;
                }

                const newScreenshots = req.files?.screenshots;
                if (newScreenshots && newScreenshots.length > 0) {
                    const screenshotResults = await Promise.all(
                        newScreenshots.map((file) => uploadTocloudinary(file.buffer))
                    );
                    updatedFields.screenshots = screenshotResults.map((r) => r.secure_url);
                }

                if (Object.keys(updatedFields).length === 0) {
                    return res.status(400).send({ message: "nothing to update" });
                }

                const result = await projectCollection.updateOne(query, { $set: updatedFields });
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "project not found" });
                }

                res.status(200).send({ message: "project updated", ...updatedFields });
            } catch (error) {
                res.status(500).send({ message: "unable to update project." });
            }
        });

        //project info deleting api:
        app.delete("/projects/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            try {
                const result = await projectCollection.deleteOne(query);
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "project not found" });
                }
                res.status(200).send({ message: "project has been deleted." })
            } catch (error) {
                res.status(500).send({ message: "unable to delete project." })
            }
        });

        //career & course related api:
        app.post("/career", verifyToken, async(req, res)=>{
            const career = req.body;
            const result = await careearCollection.insertOne(career);
            res.send(result);
        });

        app.patch("/career/:id", verifyToken, async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const updatedFields = req.body;

            if(!updatedFields || Object.keys(updatedFields).length === 0){
                return res.status(400).send({message: "nothing to update."});
            };

            try{
                const result = await careearCollection.updateOne(query, {$set: updatedFields});
                if(result.matchedCount = 0){
                    return res.status(404).send({message: "career entry not found"});
                };
                return res.send(result);
            }catch(error){
                return res.status(500).send({message: "internal error occured"})
            }
        })

        app.get("/career", async(req, res)=>{
            try{
                const result = await careearCollection.find().toArray();
                return res.send(result);
            }catch(error){
                return res.status(500).send({message: "unable to fetch career data"})
            }
        });
        

        //feedback related api's:
        app.get("/feedback", async (req, res) => {
            const feedBack = await feedbackCollection.find().toArray();
            res.send(feedBack);
        });

        //feedback posting api:
        app.post("/feedback", async (req, res) => {
            const feedBack = req.body;
            try {
                const result = await feedbackCollection.insertOne(feedBack);
                res.send(result);
            } catch (error) {
                return res.status(500).send({ message: "unable to post feedback right now." });
            };
        });



        await client.db("admin").command({ ping: 1 });
        // console.log(`Pinnged the server on port ${port}`)
    }
    finally {

    };
};

run().catch(console.dir);




app.listen(port, () => console.log(`Server is running on port ${port}`));