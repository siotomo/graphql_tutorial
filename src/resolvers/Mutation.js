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

module.exports = {
  addGirl
}