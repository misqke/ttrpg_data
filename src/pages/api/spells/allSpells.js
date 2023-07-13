import { supabase } from "../../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { data, error } = await supabase.from("spells").select("*");
    const sortedSpells = data.sort((a, b) =>
      a.tier > b.tier ? 1 : a.tier < b.tier ? -1 : 0
    );
    res.status(200).json(sortedSpells);
  }
}
