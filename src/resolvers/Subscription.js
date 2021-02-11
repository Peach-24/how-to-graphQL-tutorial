const newLinkSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
};
