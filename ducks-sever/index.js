import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db1.1jlkhfx.mongodb.net/?retryWrites=true&w=majority&appName=DB1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API ver

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const usersCollection = client.db("demoDB").collection("Users");
    app.post('/login', async (req, res) => {
      const { email, password } = req.body; 
      console.log(req.body);
  
      try {
        const existingUser = await usersCollection.findOne({ email });
        console.log(existingUser, 'existingUser');
        if (existingUser) {
          const isPasswordMatch = await bcrypt.compare(password, existingUser.hashedPassword);
          res.send(existingUser);
          return res.status(200).json({ success: 'User added successfully' });
        }
        res.status(400).json({ error: 'User already exists' });
    } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Server error' });
      }
  });
  app.get('/users', async (req, res) => {
    const cursor = usersCollection.find({});
    const users = await cursor.toArray();
    res.send(users);
  })
  app.post('/signup', async (req, res) => {
    const { email, password, name, photoURL, role } = req.body; 
    console.log(req.body);


    try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await usersCollection.insertOne({ email, hashedPassword, name, photoURL, role });
        res.status(200).json({ success: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

     


  } finally {
  // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Current active port: ${port}`);
})