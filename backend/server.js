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
        const picturesCollection = portfolio.collection("pictures");
        const userCollection = portfolio.collection("users");


        //auth related api's:
        app.post("/login", async (req, res) => {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status.send({message: "email and password are required"});
            };

            try{
                const user = await userCollection.findOne({email});
                if(!user){
                    return res.status(401).send({message: "invalid email or password"});
                };

                const passwordMatches = await bcrypt.compare(password, user.passwordHash);
                if(!passwordMatches){
                    return res.status(401).send({message: "invalid email or password"});
                }


                const token = jwt.sign(
                    {email: user.email, id: user._id},
                    process.env.JWT_SECRET,
                    {expiresIn: "22d"}
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 22 * 24 * 60 * 60 * 1000,
                }).send({message: "logged in"});
            }catch (error){
                res.status(500).send({message: "log in failed"});
            };
        });


        app.post("/logout", (req, res)=>{
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NOVE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            }).send({message: "logged out"});
        });

        app.get("/me", verifyToken, async(req, res)=>{
            const user = await userCollection.findOne(
                {email: req.decodedUser.email},
                {projection: {passwordHash: 0}},
            );

            res.send(user);
        });

        app.post("/update-profile", verifyToken, upload.single("image"), async(req, res)=>{
            const {name} = req.body;
            const updatedField = [];

            if(name){
                updatedField.name = name;
            };

            if(req.file){
                try{
                    const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                    updatedField.profilePicture = cloudinaryResult.secure_url;
                }catch(error){
                    return res.status(500).send({message: "unable to upload profile picture"})
                }
            };

            if(Object.keys(updatedField).length === 0){
                return res.status(400).send({message: "nothing to update"});
            };

            try{
                await userCollection.updateOne(
                    {email: req.decodedUser.email},
                    {$set: updatedField},
                )
            }catch(error){
                res.status(500).send({message: "unable to update profile"})
            }
        })

        //password update related api:
        app.patch("/change-password", verifyToken, async(req, res)=>{
            const {currentPassword, newPassword} = req.body;

            if(!currentPassword || !newPassword){
                return res.status(400).send({message: "current and new password are required"});
            };

            if(newPassword.length < 8){
                return res.status(400).send({message: "new password must be at least 8 character long"});
            };

            try{
                const user = await userCollection.findOne({email: req.decodedUser.email});

                if(!user){
                    return res.status(400).send({message: "user not found!"});
                };

                const passwordMatches = await bcrypt.compare(currentPassowr, user.passwordHash);
                if(!passwordMatches){
                    return res.status(401).send({message: "current passwor is incorrect"});
                };

                const newHash = await bcrypt.hash(newPassword, 12);
                await userCollection.updateOne(
                    {email: req.decodedUser.email},
                    {$set: {passwordHash: newHash}}
                );

                res.send({message: "password updated"});
            }catch(error){
                res.status(500).send({message: "unable to update password."});
            };
        });


        //projects related apis:
        app.get("/projects", async (req, res) => {
            const projects = await projectCollection.find().toArray();
            if (projects.length === 0) {
                return res.status(404).send({ message: "No Projects to Show" })
            };
            res.send(projects);
        });

        //project posting api:
        app.post("/projects", verifyToken, async (req, res) => {
            const projects = req.body;
            try {
                const result = await projectCollection.insertOne(projects);
                res.status(201).send({ message: "project added", id: result.insertedId })
            } catch (error) {
                return res.status(500).send({ message: "unable to post!!" })
            }
        });

        //project updating api:
        app.patch("/projects/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: updatedData
            };

            try {
                const result = await projectCollection.updateOne(query, updatedDoc);
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "project not found" });
                };
                res.status(200).send(result);
            } catch (error) {
                res.status(500).send({ message: "unable to update project." })
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
                res.status(201).send({ message: "Your feedback is appreciated." })
            } catch (error) {
                return res.status(500).send({ message: "unable to post feedback right now." });
            };
        });


        //picture related api start here:
        app.post("/pictures", verifyToken, upload.single("image"), async (req, res) => {
            if (!req.file) {
                return res.status(400).send({ message: "no image received." });
            };

            try {
                const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                const pictureDoc = {
                    url: cloudinaryResult.secure_url,
                    publicId: cloudinaryResult.public_id,
                    uploadedAt: new Date(),
                };

                const result = await picturesCollection.insertOne(pictureDoc);
                res.status(201).send({ message: "image has been uploaded" });
            } catch {
                res.status(500).send({ message: "unable to upload image" });
            }
        });

        app.post("/pictures/certification", verifyToken, upload.single("image"), async (req, res) => {
            if (!req.file) {
                return res.status(400).send({ message: "no image received." });
            };

            try {
                const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                const pictureDoc = {
                    url: cloudinaryResult.secure_url,
                    publicId: cloudinaryResult.public_id,
                    uploadedAt: new Date(),
                };

                const result = await picturesCollection.insertOne(pictureDoc);
                res.status(201).send({ message: "image has been uploaded" });
            } catch {
                res.status(500).send({ message: "unable to upload image!" });
            };
        });

        app.post("/pictures/projects", upload.single("image"), async (req, res) => {
            if (!req.file) {
                return res.status(400).send({ message: "no images received." });
            };

            try {
                const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                const pictureDoc = {
                    url: cloudinaryResult.secure_url,
                    publicId: cloudinaryResult.public_id,
                    uploadedAt: new Date(),
                };

                const result = await picturesCollection.insertOne(pictureDoc);
                res.status(201).send({ message: "image has been uploaded" });
            } catch {
                res.status(500).send({ message: "unable to upload image." });
            }
        });

        //picture getting api:
        app.get("/pictures", async (req, res) => {
            const pictures = await picturesCollection.find().toArray();
            res.send(pictures);
        })


        await client.db("admin").command({ ping: 1 });
        // console.log(`Pinnged the server on port ${port}`)
    }
    finally {

    };
};

run().catch(console.dir);




app.listen(port, () => console.log(`Server is running on port ${port}`));