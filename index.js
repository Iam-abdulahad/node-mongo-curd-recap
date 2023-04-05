const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


//use Middle ware.......

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tdy11iu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
        try {
                await client.connect();
                const userCollection = client.db('userExpress').collection('user1');

                //get user 

                app.get('/user', async (req, res) => {
                        const query = {};
                        const cursor = userCollection.find(query);
                        const users = await cursor.toArray();
                        res.send(users);
                });

                // app.get('/user/:id', async (req, res) => {
                //         const id = req.params.id;
                //         const query = { _id: new ObjectId(id) };
                //         const result = await userCollection.findOne(query);
                //         res.send(result);
                // });

                //POST user

                // POST
                app.post('/user', async (req, res) => {
                        const newUser = req.body;
                        console.log('adding new user', newUser);
                        const result = await userCollection.insertOne(newUser);
                        res.send(result)
                });
        }
        finally {

        }
}

run().catch(console.dir);


app.get('/', (eq, res) => {
        res.send('server is running....!')
})

app.listen(port, () => {
        console.log('Curd server is running!!');
})