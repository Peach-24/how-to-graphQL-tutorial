const { apolloServer, ApolloServer } = require("apollo-server");

let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "www.howtographql.com",
  },
  {
    id: "link-1",
    description: "lalalalalalla",
    url: "www.lalalalla.com",
  },
  {
    id: "link-2",
    description: "Josh's Portfolio",
    url: "www.joshpeachey.co.uk",
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find((item) => item.id === args.id);
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find((item) => item.id === args.id);
      link.url = args.url ? args.url : link.url;
      link.description = args.description ? args.description : link.description;
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.find((item) => item.id === args.id);
      links.splice(links.indexOf(link), 1);
      return link;
    },
  },
};

const fs = require("fs");
const path = require("path");

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
