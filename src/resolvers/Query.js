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

  // the links query now receives two additional arguments which might be carried by the incoming args object. Again, Prisma will take care of the rest.

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
  });

  return links;
};

module.exports = {
  feed,
};
