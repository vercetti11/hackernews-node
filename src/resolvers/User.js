function links(parent, _, context) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).links();
}

module.exports = {
  links,
};
