const { argsToArgsConfig } = require("graphql/type/definition");

async function girl(_,args,context){
  const girl = await context.prisma.girl.findFirst({
    where: {
      name: args.name
    }
  })
  return girl
}
async function girls(_, _, context){
  const girls = await context.prisma.girl.findMany();
  console.log(girls);
  return girls;
}

async function stores(_, _, context){
  const stores = await context.prisma.store.findMany();
  return stores;
}

module.exports = {
  girl, girls, stores
}