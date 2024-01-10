require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000;


// middlewares
app.use(cors())
app.use(express.json())


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // DB: tasks collection
    const tasksCollection = client.db("taskifyDB").collection("tasks")

    // GET; all the tasks
    app.get("/tasks", async(req, res)=> {
        const result = await tasksCollection.find().toArray();
        res.send(result);
    })

    // PATCH; task attachment number
    app.patch("/task/:id", async(req,res)=>{
        const id = req?.params?.id;
        const attachments = req?.body;
        
        const filter = {_id: new ObjectId(id)}
        const task = await tasksCollection.findOne(filter)
       const updatedAttachments = attachments?.count + task?.attachment_counts
        const updatedTask = {
            $set: {
                attachment_counts: updatedAttachments
            }
        }
        const result = await tasksCollection.updateOne(filter, updatedTask)
        res.send({result, updatedAttachments})
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req,res)=>{
    res.send("Taskify is running")
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})