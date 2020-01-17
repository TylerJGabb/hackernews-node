const { GraphQLServer } = require("../node_modules/graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const  Query  = require('../resolvers/Query');
/**
 * So prisma comes out of the box with capabilities to wire to a MySQL server running on AWS Aurora.
 * That was used here, but we can configure it to use a local database, or database of our choice.
 * You can set up prisma by typing `prisma deploy`.
 *
 * Right now the PrismaServer is somewhere on AWS
 */

const resolvers = {
  Query,

  Mutation: {
    postLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    deleteLink: (root, args, context) => {
      return prisma.deleteLink({
        id: args.id
      });
    }
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql", //points to file with schema definitions
  resolvers,
  context: { prisma } //context will have an initial property now called `prisma`, the instance of our prisma ORM
});

server.start(() => console.log("Im running on localhost:4000!"));
