APP_SECRET = 'GraphQL'

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function addGirl(_, args, context){
  const newGirl =
    context.prisma.girl.create({
      data: {
        name: args.name,
        age: args.age,
        storeId: args.storeId
      }
    });
  return newGirl;
}
async function openStore(_, args, context){
  const password = await bcrypt.hash(args.password, 10);

  const newStore = context.prisma.store.create({
    data: {
      ...args,
      password
    }
  })

  const token = jwt.sign({store_id: newStore.id}, APP_SECRET)

  return {
    token: token,
    store: newStore
  }
}

async function signIn(_, args, context){
  const store = await context.prisma.store.findFirst({
    where: {
      name: args.name
    }
  })
  if(!store){
    throw new Error('そのようなユーザーは存在しません')
  }
  const isAuth = await bcrypt.compare(args.password, store.password)

  if(!isAuth){
    throw new Error('パスワードが違います')
  }

  if(isAuth){
    return {
      token: jwt.sign({store_id: store.id}, APP_SECRET),
      store: store
    };
  }
}

module.exports = {
  addGirl,
  openStore,
  signIn
}