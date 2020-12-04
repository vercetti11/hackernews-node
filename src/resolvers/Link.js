function postedBy(parent, _, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

function votes(parent, _, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  votes,
};
