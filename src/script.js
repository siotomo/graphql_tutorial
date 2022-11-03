// DBにアクセスするためのクライアントライブラリ
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

async function main(){
  // const newGirl = await prisma.girl.create({
  //   data: {
  //     name: 'しずく',
  //     age: 23
  //   }
  // })

  const allGirls = await prisma.girl.findMany();
  console.log(allGirls);
}

main()
  .catch((e)=>{
    throw e;
  })
  .finally(async()=>{
    // DBを閉じる
    prisma.$disconnect;
  })