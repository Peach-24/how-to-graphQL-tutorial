const { apolloServer, ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context, info) => {
      return context.prisma.link.findMany();
    },
    // link: (parent, args) => {
    //   return links.find((item) => item.id === args.id);
    // },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    // updateLink: (parent, args) => {
    //   const link = links.find((item) => item.id === args.id);
    //   link.url = args.url ? args.url : link.url;
    //   link.description = args.description ? args.description : link.description;
    //   return link;
    // },
    // deleteLink: (parent, args) => {
    //   const link = links.find((item) => item.id === args.id);
    //   links.splice(links.indexOf(link), 1);
    //   return link;
    // },
  },
};

const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
