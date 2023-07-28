import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === undefined) {
      const { data, error } = await supabase.from("meta_magic").select("*");
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("meta_magic")
        .select("*")
        .eq("id", id);
      res.status(200).json(data[0]);
    }
  }
  // POST
  else if (req.method === "POST") {
    const metaMagic = req.body;
    const { data, error } = await supabase
      .from("meta_magic")
      .insert(metaMagic)
      .select();
    res.status(201).json(data[0]);
  }
  // PATCH
  else if (req.method === "PUT") {
    const updatedMetaMagic = req.body;
    const { error } = await supabase
      .from("meta_magic")
      .update(updatedMetaMagic)
      .eq("id", updatedMetaMagic.id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(updatedMetaMagic);
  }
}
