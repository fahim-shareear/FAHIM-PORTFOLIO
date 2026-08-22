require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const port = process.env.PORT || 3000;




//middlewares:
const app = express();
app.use(cors());
app.use(express.json());
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
const uploadTocloudinary = (fileBuffer) =>{
    return new Promise((resolve, reject) =>{
        const stream = cloudinary.uploader.upload_stream(
            {folder: "portfolio-images"},
            (error, result) =>{
                if(error) return reject(error);
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



        //projects related apis:
        app.get("/projects", async (req, res) => {
            const projects = await projectCollection.find().toArray();
            if (projects.length === 0) {
                return res.status(404).send({ message: "No Projects to Show" })
            };
            res.send(projects);
        });

        //project posting api:
        app.post("/projects", async (req, res) => {
            const projects = req.body;
            try {
                const result = await projectCollection.insertOne(projects);
                res.status(201).send({ message: "project added", id: result.insertedId })
            } catch (error) {
                return res.status(500).send({ message: "unable to post!!" })
            }
        });

        //project updating api:
        app.patch("/projects/:id", async (req, res) => {
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
        app.delete("/projects/:id", async (req, res) => {
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
        app.post("/pictures", upload.single("image"), async (req, res)=>{
            if(!req.file){
                return res.status(400).send({message: "no image received."});
            };

            try{
                const cloudinaryResult = await uploadTocloudinary(req.file.buffer);
                const pictureDoc = {
                    url: cloudinaryResult.secure.url,
                    publicId: cloudinaryResult.publid_id,
                    uploadedAt: new Date(),
                };

                const result = await picturesCollection.insertOne(pictureDoc);
                res.status(201).send({message: "image has been uploaded"});
            }catch{
                res.status(500).send({message: "unable to upload image"});
            }
        });

        //picture getting api:
        app.get("/pictures", async(req, res)=>{
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