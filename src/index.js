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
   /**
    * each resolver can take up to 4 arguments, context is one of those arguments.
    * setting this field in GraphQLServer's properties makes it so each resolver's context
    * argument will contain everything in the request, and additionally, prisma. 
    */
    return {
      ...request,
      prisma //context will have an initial property now called `prisma`, the instance of our prisma ORM
    };
  }
});

server.start(() => console.log("Im running on localhost:4000!"));
