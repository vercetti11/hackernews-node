function postedBy(parent, _, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  postedBy,
};
