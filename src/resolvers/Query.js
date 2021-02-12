const feed = async (parent, args, context, info) => {
  // If no filter string is provided, then the where object will be just an empty object and no filtering conditions will be applied by Prisma Client when it returns the response for the links query.

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
  });

  return links;
};

module.exports = {
  feed,
};
