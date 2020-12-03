function links(parent, _, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

module.exports = {
  links,
};
