const { apolloServer, ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // feed: async (parent, args, context, info) => {
    //   return context.prisma.link.findMany();
    // },
  },
  Mutation: {
    // post: (parent, args, context, info) => {
    //   const newLink = context.prisma.link.create({
    //     data: {
    //       url: args.url,
    //       description: args.description,
    //     },
    //   });
    //   return newLink;
    // },
  },
};

const fs = require("fs");
const path = require("path");
const { getUserID } = require("./utils");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
