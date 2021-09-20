const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
  const uri = "mongodb://localhost:27017/protranslating";
  const client = new MongoClient("mongodb://localhost:27017/protranslating", {
    useNewUrlParser: true,
  });

  try {
    await client.connect();

    const pCollection = client.db("protranslating").collection("providers");
    const cCollection = client.db("protranslating").collection("clients");

    const cExists = await cCollection.countDocuments();
    const pExists = await pCollection.countDocuments();
    if (cExists) cCollection.drop();
    if (pExists) pCollection.drop();

    let pRecords = [];
    let cRecords = [];

    for (let i = 1; i < 6; i += 1) {
      let fakeProvider = {
        id: i,
        name: `Provider${i}`,
      };
      pRecords.push(fakeProvider);

      const name = faker.name.firstName();
      let fakeClient = {
        name: name,
        email: faker.internet.email(name),
        phone: faker.phone.phoneNumber(),
        providers: [
          { id: getRandomIdBetween(1, 5) },
          { id: getRandomIdBetween(1, 5) },
        ],
      };
      cRecords.push(fakeClient);
    }
    await cCollection.insertMany(cRecords);

    await pCollection.insertMany(pRecords);
    client.close();
  } catch (err) {
    console.error("ERROR", err.stack);
  }
}

const getRandomIdBetween = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

seedDB();
