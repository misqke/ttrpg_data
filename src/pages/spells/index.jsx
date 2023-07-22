import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ spells }) {
  const router = useRouter();
  const [filteredSpells, setFilteredSpells] = useState([...spells]);

  const handleFilter = (e) => {
    const val = e.target.value;
    if (val === "all") {
      setFilteredSpells(spells);
    } else {
      setFilteredSpells(spells.filter((t) => t.tier == val));
    }
  };

  const handleRowClick = (id) => {
    router.push(`/spells/${id}`);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Spells</h1>
        <Link className="button" href={"/spells/NewSpell"}>
          New Spell
        </Link>
      </div>
      <hr />
      <p>
        Spells are unlocked though lineage and background features as well as by
        spending talent points when you level up on Spell Talents (Spells: Tier
        1, Spells: Tier 2, etc.). Each spell has a Tier and a number of Levels
        the spell can be cast at, as well as a required character level to cast
        the spell at that level.
      </p>
      <hr />

      <div className="table-container">
        <div className="mb-4">
          <label htmlFor="spellTierSelect">Tier:</label>
          <select id="spellTierSelect" onChange={(e) => handleFilter(e)}>
            <option value="all">All</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <table className="border-collapse border border-slate-300">
          <thead className="bg-teal-500  text-white">
            <tr>
              <th className="border border-slate-300 p-1">Tier</th>
              <th className="border border-slate-300 p-1">Name</th>
              <th className="border border-slate-300 p-1">Casting Time</th>
              <th className="border border-slate-300 p-1">Concentration</th>
              <th className="border border-slate-300 p-1">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpells.length ? (
              filteredSpells.map((s) => (
                <tr
                  className="clickable"
                  key={s.id}
                  onClick={(e) => handleRowClick(s.id)}
                >
                  <td className="border border-slate-300 p-1">{s.tier}</td>
                  <td className="border border-slate-300 p-1">{s.name}</td>
                  <td className="border border-slate-300 p-1">
                    {s.casting_time}
                  </td>
                  <td className="border border-slate-300 p-1">
                    {String(s.concentration)}
                  </td>
                  <td className="border border-slate-300 p-1">
                    {s.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No spells</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr />
      <CommentBox topic="spells" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/spells/allSpells");
  return {
    props: {
      spells: data,
    },
  };
};
