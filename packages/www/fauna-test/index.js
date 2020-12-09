const faunadb = require("faunadb");
const q = faunadb.query;



var client = new faunadb.Client({ secret: process.env.FAUNA});

console.log(process.env.FAUNA);

async function run() {
    const results = await client.query(
      q.Create(q.Collection("todos"), {
        data: {
          text: "This is my second todo",
          done: false,
          owner: "user-test-3"
        }
      })
    );
    console.log(results.ref.id);
 }


  run()
 