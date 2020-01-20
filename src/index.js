const { GraphQLServer } = require("../node_modules/graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("../resolvers/Query");
const Mutation = require("../resolvers/Mutation");
const Link = require('../resolvers/Link');
const User = require('../resolvers/User');

/**
 * So prisma comes out of the box with capabilities to wire to a MySQL server running on AWS Aurora.
 * That was used here, but we can configure it to use a local database, or database of our choice.
 * You can set up prisma by typing `prisma deploy`.
 *
 * Right now the PrismaServer is somewhere on AWS
 */

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql", //points to file with schema definitions
  resolvers: {
    Query,
    Mutation,
    Link,
    User
  },
  context: request => {
    return {
      ...request,
      prisma //context will have an initial property now called `prisma`, the instance of our prisma ORM
    };
  }
});

server.start(() => console.log("Im running on localhost:4000!"));
