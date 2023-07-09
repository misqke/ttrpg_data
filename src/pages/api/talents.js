// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("talents").select("*");
    const sortedAbilities = data.sort((a, b) =>
      a.tier < b.tier ? 1 : a.tier > b.tier ? -1 : 0
    );
    res.status(200).json(sortedAbilities);
  } else if (req.method === "POST") {
    const { name, tier, cost, ranks, prerequisites, description } = req.body;
    const { error } = await supabase.from("talents").insert({
      name: name,
      tier: Number(tier),
      cost: Number(cost),
      ranks: Number(ranks),
      prerequisites: prerequisites || null,
      description: description,
    });
    console.log(error);
    res.status(201).json();
  }
}