const { ApolloServer, gql } = require("apollo-server");

// GraphQLのスキーマ定義
const typeDefs = gql`
  type Girl {
    name: String
    age: String
  }

  type Query {
    girls: [Girl]
  }
`

const resolvers = {
  Query: {
    girls: () => girls
  }
}

const girls = [
  {
    name: 'しずく',
    age: '23'
  },
  {
    name: '中原かりん',
    age: '25'
  },
  {
    name: 'はな',
    age: '28'
  },
]

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({url}) => console.log(`${url}でGraphQLサーバー起動中`));
