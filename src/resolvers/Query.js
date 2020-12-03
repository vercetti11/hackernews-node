const feed = (_, __, context) => {
  return context.prisma.link.findMany();
};

const link = (_, args, context) =>
  context.prisma.link.findUnique({
    where: {
      id: parseInt(args.id),
    },
  });

module.exports = {
  feed,
  link,
};
