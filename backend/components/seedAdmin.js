require('dotenv').config();
const {MongoCLient, ServerApiVersion} = require('mongodb');
const bcrypt = require('bcrypt');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGO_PASSWORD}@learning-server.eft4uy8.mongodb.net/?appName=learning-server`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function seed(){
    const email = process.argv[2];
    const plainPassword = process.argv[3];

    if(!email || !plainPassword){
        console.log("usage: node seedAdmin.js you@example.com yourPassword");
        process.exit(1);
    }

    try{
        await client.connect();
        const users = client.db("portfolio").collection("users");

        const existing  = await users.findOne({email});
        if(existing){
            console.log("a user with that email already exists");
            process.exit(1);
        };

        const passwordHash = await bcrypt.hash(plainPassword, 12);
        await users.insertOne({email, passwordHash, createdAt: new Date()});

        console.log("admin user created:", email);
    }finally{
        await client.close();
    };
};

seed();