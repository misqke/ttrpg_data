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
    res.status(201).json(newSpell);
  }
  // PUT
  else if (req.method === "PUT") {
    const { spell, spellLevels } = req.body;
    const updatedSpell = await updateSpell(spell, spellLevels);
    res.status(200).json(updatedSpell);
  }
  // DELETE
  else if (req.method === "DELETE") {
    const spellLevel = req.body;
    await deleteSpellLevel(spellLevel);
    res.status(200).json(spellLevel);
  }
}

const getSpell = async (id) => {
  const spell = await supabase.from("spells").select("*").eq("id", id);
  const spellLevels = await supabase
    .from("spell_levels")
    .select("*")
    .eq("spell_id", id);
  const sortedSpellLevels = spellLevels.data.sort((a, b) =>
    a.level > b.level ? 1 : a.level < b.level ? -1 : 0
  );
  return { spell: spell.data[0], spellLevels: sortedSpellLevels };
};

const insertSpell = async (spell, spellLevels) => {
  const newSpell = await supabase.from("spells").insert(spell).select();
  spellLevels.forEach((sl) => {
    sl.spell_id = newSpell.data[0].id;
  });
  const newSpellLevels = await supabase
    .from("spell_levels")
    .insert(spellLevels)
    .select();
  return { spell: newSpell.data[0], spellLevels: newSpellLevels.data };
};

const updateSpell = async (spell, spellLevels) => {
  const updatedSpell = await supabase
    .from("spells")
    .update(spell)
    .eq("id", spell.id)
    .select();
  spellLevels.forEach(async (sl) => {
    await supabase.from("spell_levels").update(sl).eq("id", sl.id);
  });
  return { updatedSpell, spellLevels };
};

const deleteSpellLevel = async (spellLevel) => {
  await supabase.from("spell_levels").delete().eq("id", spellLevel.id);
};
