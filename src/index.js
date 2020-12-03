const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, args) => links.find(link => link.id === args.id),
  },
  Mutation: {
    post: (_, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (_, args) => {
      const updateLink = {
        ...(!!args.description && { description: args.description }),
        ...(!!args.url && { url: args.url }),
      };
      const indexUpdate = links.findIndex(link => link.id === args.id);
      links[indexUpdate] = { ...links[indexUpdate], ...updateLink };
      return updateLink;
    },
    deleteLink: (_, args) => {
      links = links.filter(link => link.id !== args.id);
      return { id: args.id };
    },
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
