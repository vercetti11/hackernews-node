const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;
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

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
