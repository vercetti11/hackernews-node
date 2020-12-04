const feed = async (_, args, context) => {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
  });
  return links;
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
