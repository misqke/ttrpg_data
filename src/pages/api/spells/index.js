import { supabase } from "../../../../utils/supabase";

export default async function handler(req, res) {
  // GET
  if (req.method === "GET") {
    const { id } = req.query;
    const spell = await getSpell(id);
    res.status(200).json(spell);
  }
  // POST
  else if (req.method === "POST") {
    const { spell, spellLevels } = req.body;
    const newSpell = await insertSpell(spell, spellLevels);
    console.log(newSpell);
    res.status(201).json(newSpell);
  }
  // PUT
  else if (req.method === "PUT") {
  }
}

const getSpell = async (id) => {
  const spell = await supabase.from("spells").select("*").eq("id", id);
  const spellInfo = await supabase
    .from("spell_levels")
    .select("*")
    .eq("spell_id", id);
  return { spell: spell.data[0], spellInfo: spellInfo.data };
};

const insertSpell = async (spell, spellLevels) => {
  const spell = await supabase.from("spells").insert(spell).select()[0];
  const spellLevels = await supabase
    .from("spell_levels")
    .insert(spellLevels)
    .select();
  return { spell, spellLevels };
};
