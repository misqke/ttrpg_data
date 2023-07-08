// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const abilities = await prisma.ability.findMany();
    const sortedAbilities = abilities.sort((a, b) =>
      a.tier < b.tier ? 1 : a.tier > b.tier ? -1 : 0
    );
    res.status(200).json(sortedAbilities);
  } else if (req.method === "POST") {
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
    res.status(200).json(newAbility);
  }
}
