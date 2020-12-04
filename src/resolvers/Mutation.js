const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const post = (_, args, context) => {
  const userId = getUserId(context);
  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

const updateLink = (_, args, context) => {
  const userId = getUserId(context);

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
};

const deleteLink = (_, args, context) => {
  const deleteLink = context.prisma.link.delete({
    where: { id: parseInt(args.id) },
  });
  return deleteLink;
};

async function signup(_, args, context) {
  // 1
  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
}

async function login(_, args, context) {
  // 1
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

async function vote(_, args, context) {
  // 1
  const userId = getUserId(context);

  // 2
  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote,
};
