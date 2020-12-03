const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const { feed, link } = require("./resolvers/Query");
const { post, updateLink, deleteLink } = require("./resolvers/Mutation");
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed,
    link,
  },
  Mutation: {
    post,
    updateLink,
    deleteLink,
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
