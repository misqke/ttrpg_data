// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, tier, cost, ranks, prerequisite, description } = req.body;
    const newAbility = await prisma.ability.create({
      data: {
        name: name,
        tier: Number(tier),
        cost: Number(cost),
        ranks: Number(ranks),
        prerequisite: prerequisite || null,
        description: description,
      },
    });
    console.log(newAbility);
    res.status(200).json(newAbility);
  }
}
