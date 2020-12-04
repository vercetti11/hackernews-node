function newLinkSubscribe(_, __, context) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  },
};

function newVoteSubscribe(_, __, context) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
