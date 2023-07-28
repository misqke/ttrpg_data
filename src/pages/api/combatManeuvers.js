import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === undefined) {
      const { data, error } = await supabase
        .from("combat_maneuvers")
        .select("*");
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("combat_maneuvers")
        .select("*")
        .eq("id", id);
      res.status(200).json(data[0]);
    }
  }
  // POST
  else if (req.method === "POST") {
    const combatManeuver = req.body;
    const { data, error } = await supabase
      .from("combat_maneuvers")
      .insert(combatManeuver)
      .select();
    res.status(201).json(data[0]);
  }
  // PATCH
  else if (req.method === "PUT") {
    const updatedCombatManeuver = req.body;
    const { error } = await supabase
      .from("combat_maneuvers")
      .update(updatedCombatManeuver)
      .eq("id", updatedCombatManeuver.id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(updatedCombatManeuver);
  }
}
