function girl(){
  return girls[0]
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