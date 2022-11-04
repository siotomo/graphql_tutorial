const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const path = require('path');

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 実際の処理を行う部分
const resolvers = {
  Query: {
    girl: () => girls[0],
    girls: async(parent, args, context) => {
      const girls = await context.prisma.girl.findMany()
      console.log(girls);
      return girls;
    },
    store: () => store,
  },
  Mutation: {
    addGirl: async (parent, args, context) => {
      const newGirl =
        context.prisma.girl.create({
          data: {
            name: args.name,
            age: args.age
          }
        });
      return newGirl;
    }
  }
}
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  }
})
server.listen().then(({url}) => console.log(`${url}でGraphQLサーバー起動中`));
