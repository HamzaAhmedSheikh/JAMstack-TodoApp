const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config()


var client = new faunadb.Client({ secret: process.env.FAUNA});

console.log(process.env.FAUNA);

async function run() {
    const results = await client.query(
      q.Create(q.Collection("todos"), {
        data: {
          text: "This is my third todo",
          done: true,
          owner: "user-test-3"
        }
      })
    );
    console.log(results.ref.id);
 }


  run()
 