import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === undefined) {
      const { data, error } = await supabase
        .from("fighting_styles")
        .select("*");
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("fighting_styles")
        .select("*")
        .eq("id", id);
      res.status(200).json(data[0]);
    }
  }
  // POST
  else if (req.method === "POST") {
    const fightingStyle = req.body;
    const { data, error } = await supabase
      .from("fighting_styles")
      .insert(fightingStyle)
      .select();
    res.status(201).json(data[0]);
  }
  // PATCH
  else if (req.method === "PUT") {
    const updatedFightingStyle = req.body;
    const { error } = await supabase
      .from("fighting_styles")
      .update(updatedFightingStyle)
      .eq("id", updatedFightingStyle.id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(updatedFightingStyle);
  }
}
