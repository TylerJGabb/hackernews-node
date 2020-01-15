const { GraphQLServer } = require("../node_modules/graphql-yoga");
/**
 * Each GraphQL Schema has three ROOT types
 * Query
 * Mutation
 * Subscription
 */

// ideally this would come from a database, but you can
// pretend for now
let links = [
  {
    id: "link-0",
    url: "www.google.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },

  Mutation: {
    postLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      const link = links.find(l => l.id === args.id);
      if (link) {
        if (args.description) link.description = args.description;
        if (args.url) link.url = args.url;
        return link;
      }
    },

    deleteLink: (parent, args) => {
      let found = links.find(l => l.id === args.id);
      if (found) {
        links = links.filter(l => l !== found);
        return found;
      }
    }
  }
};

const server = new GraphQLServer({
  //points to file with schema definitions
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log("Im running on localhost:4000!"));
