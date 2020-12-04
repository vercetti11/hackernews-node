function link(parent, _, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
}

function user(parent, _, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}

module.exports = {
  link,
  user,
};
