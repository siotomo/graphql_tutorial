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
  const password = bcrypt.hash(password, 10);

  const newStore = context.prisma.store.create({
    ...args,
    password
  })
}

module.exports = {
  addGirl,
  openStore
}