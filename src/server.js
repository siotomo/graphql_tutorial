const { ApolloServer, gql } = require("apollo-server");

// GraphQLのスキーマ定義
const typeDefs = gql`
  type Query {
    girl: Girl
    girls: [Girl]
    store: Store
  }
  type Mutation {
    addGirl(name: String!, age: Int): Girl
  }
  type Girl {
    name: String
    age: Int
  }
  type Store {
    name: String!
    girls: [Girl]
  }
`

// 実際の処理を行う部分
const resolvers = {
  Query: {
    girl: () => girls[0],
    girls: () => girls,
    store: () => store,
  },
  Mutation: {
    addGirl: (parent, args) => {
      console.log(args)
      // if(girls.includes(args.name)) return `${args.name}は既に存在しています`

      girls.push({name: args.name, age: args.age});
      return girls[0]
    }
  }
}

// データがないのでハードコーディング
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

const store = {
  name: 'ギャラクシー',
  girls: girls.slice(0,2)
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({url}) => console.log(`${url}でGraphQLサーバー起動中`));
