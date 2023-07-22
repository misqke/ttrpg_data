import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

class SpellLevel {
  constructor() {
    this.level = 1;
    this.required_level = 1;
    this.magic_points = 1;
    this.range = "";
    this.duration = "Instantaneous";
    this.description = "";
  }
}

const NewSpell = () => {
  const router = useRouter();
  const [spell, setSpell] = useState({
    tier: 1,
    name: "",
    casting_time: "Action",
    concentration: false,
    description: "",
  });
  const [spellLevels, setSpellLevels] = useState([new SpellLevel()]);

  const handleDeleteLevel = (i) => {
    setSpellLevels((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  const handleAddLevel = () => {
    setSpellLevels((prev) => [...prev, new SpellLevel()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/spells", {
      spell,
      spellLevels,
    });
    router.push("/spells");
  };

  return (
    <Page>
      <h2>New Spell</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <div className="flex row items-start">
          <label className="view-label">Name: </label>
          <input
            type="text"
            value={spell.name}
            onChange={(e) =>
              setSpell((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Tier: </label>
          <input
            type="number"
            value={spell.tier}
            onChange={(e) =>
              setSpell((prev) => ({ ...prev, tier: e.target.value }))
            }
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Casting Time: </label>
          <input
            type="text"
            value={spell.casting_time}
            onChange={(e) =>
              setSpell((prev) => ({
                ...prev,
                casting_time: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Concentration: </label>
          <select
            value={spell.concentration}
            className="my-auto"
            onChange={(e) =>
              setSpell((prev) => ({
                ...prev,
                concentration: e.target.value,
              }))
            }
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={spell.description}
            onChange={(e) =>
              setSpell((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="p-1 w-5">Level</th>
                <th className="p-1 w-5">Req Level</th>
                <th className="p-1 w-10">MP</th>
                <th className="p-1 w-28">Range</th>
                <th className="p-1 w-28">Duration</th>
                <th className="p-1">Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {spellLevels.map((s, i) => (
                <tr key={i}>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="number"
                      value={spellLevels[i].level}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], level: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="number"
                      value={spellLevels[i].required_level}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], required_level: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="number"
                      value={spellLevels[i].magic_points}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], magic_points: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      value={spellLevels[i].range}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], range: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      value={spellLevels[i].duration}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], duration: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input
                      type="text"
                      value={spellLevels[i].description}
                      onChange={(e) =>
                        setSpellLevels((prev) => [
                          ...prev.slice(0, i),
                          { ...prev[i], description: e.target.value },
                          ...prev.slice(i + 1),
                        ])
                      }
                    />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <button type="button" onClick={(e) => handleDeleteLevel(i)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex row items-center justify-between">
          <button
            className="button"
            type="button"
            onClick={(e) => handleAddLevel()}
          >
            Add Level
          </button>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Page>
  );
};

export default NewSpell;
