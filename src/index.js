const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (_, __, context) => {
      return context.prisma.link.findMany();
    },
    link: (_, args, context) =>
      context.prisma.link.findUnique({
        where: {
          id: parseInt(args.id),
        },
      }),
  },
  Mutation: {
    post: (_, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: (_, args, context) => {
      const updatedLink = context.prisma.link.update({
        where: {
          id: parseInt(args.id),
        },
        data: {
          ...(!!args.description && { description: args.description }),
          ...(!!args.url && { url: args.url }),
        },
      });
      return updatedLink;
    },
    deleteLink: (_, args, context) => {
      const deleteLink = context.prisma.link.delete({
        where: { id: parseInt(args.id) },
      });
      return deleteLink;
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
