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

module.exports = {
  addGirl,
  openStore
}