import { supabase } from "../../../utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    const { data, error } = await supabase
      .from("people")
      .select("*")
      .eq("name", name)
      .eq("password", password);

    if (error) {
      console.log(error);
      res.status(500).json({ error });
    }
    if (data.length === 1) {
      res.status(200).json({ user: data[0] });
    } else {
      res.status(401).json({ error: "Name and password do not match." });
    }
  }
}
