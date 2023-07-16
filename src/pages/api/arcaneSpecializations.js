import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === undefined) {
      const { data, error } = await supabase
        .from("arcane_specializations")
        .select("*");
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("arcane_specializations")
        .select("*")
        .eq("id", id);
      res.status(200).json(data[0]);
    }
  }
  // POST
  else if (req.method === "POST") {
    const { data, error } = await supabase
      .from("arcane_specializations")
      .insert(req.body)
      .select();
    res.status(201).json(data[0]);
  }
  // PATCH
  else if (req.method === "PUT") {
    const { error } = await supabase
      .from("arcane_specializations")
      .update(req.body)
      .eq("id", req.body.id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(req.body);
  }
}
