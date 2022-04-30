const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
//shahadat
//FNxprarHn96jjd2G

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.otl3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const bikeCollection = client.db("bike").collection("machine");

    //get
    app.get("/items", async (req, res) => {
      const query = req.params;
      console.log(query);
      const cursor = bikeCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });

    //post
    app.post("/item", async (req, res) => {
      const bike = req.body;
      const result = await bikeCollection.insertOne(bike);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
