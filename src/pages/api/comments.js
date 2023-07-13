import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { topic, id } = req.query;

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("topic", topic)
      .eq("topic_id", id);

    res.status(200).json(data);
  }
  // POST
  else if (req.method === "POST") {
    const newPost = req.body;
    const { data, error } = await supabase
      .from("comments")
      .insert(newPost)
      .select();
    res.status(201).json(data[0]);
  }
}
