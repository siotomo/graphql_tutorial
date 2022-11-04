// データ
const girls = [
  {
    name: 'しずく',
    age: 23
  },
  {
    name: '中原かりん',
    age: 25
  },
  {
    name: 'はな',
    age: 28
  },
]

// DBにアクセスするためのクライアントライブラリ
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){
  const newGirl = await prisma.girl.create({
    data: girls[0]
  })

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