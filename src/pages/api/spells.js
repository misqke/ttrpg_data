import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === undefined) {
      const { data, error } = await supabase.from("spells").select("*");
      const sortedSpells = data.sort((a, b) =>
        a.tier < b.tier ? 1 : a.tier > b.tier ? -1 : 0
      );
      res.status(200).json(sortedSpells);
    } else {
      const { data, error } = await supabase
        .from("spells")
        .select("*")
        .eq("id", id);
      res.status(200).json(data[0]);
    }
  }
  // POST
  else if (req.method === "POST") {
    const {
      name,
      tier,
      range,
      duration,
      casting_time,
      magic_points,
      concentration,
      description,
      upcast,
    } = req.body;
    const { error } = await supabase.from("spells").insert({
      name,
      tier: Number(tier),
      range,
      duration,
      casting_time,
      magic_points,
      concentration,
      description,
      upcast,
    });
    console.log(error);
    res.status(201).json();
  }
  // PATCH
  else if (req.method === "PATCH") {
    const updatedSpell = req.body;
    const { error } = await supabase
      .from("spells")
      .update(updatedSpell)
      .eq("id", updatedSpell.id);
    res.status(200).json(updatedSpell);
  }
}
