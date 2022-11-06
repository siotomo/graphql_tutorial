const bcrypt = require("bcryptjs")

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

  return newStore;
}

async function signIn(_, args, context){
  const hased_password = await bcrypt.hash(args.password, 10);
  console.log(hased_password);
  const store = await context.prisma.store.findFirst({
    where: {
      // name: "ウルトラギャラクシー"
      password: hased_password
    }
  })
  return store;
}

module.exports = {
  addGirl,
  openStore,
  signIn
}