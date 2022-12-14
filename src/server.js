const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const path = require('path');

const { PrismaClient } = require("@prisma/client");
const { addGirl, openStore, signIn } = require("./resolvers/Mutation");
const { girl, girls, stores } = require("./resolvers/Query");

const prisma = new PrismaClient();
// 実際の処理を行う部分
const resolvers = {
  Query:{
    girl: girl,
    girls: girls,
    stores: stores
  },
  Mutation: {
    addGirl: addGirl,
    openStore: openStore,
    signIn: signIn
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
