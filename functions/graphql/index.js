const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using Graphql schema language

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provider resolver functions for your schema fields

const resolvers = {
  Query: {
    hello: () => 'Hello World!',  
  },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,

   // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true
})

exports.handler = server.createHandler()