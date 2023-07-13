import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";
import Link from "next/link";

const ViewSpell = ({ spellData }) => {
  const [spell, setSpell] = useState(spellData.spell);
  const [spellLevels, setSpellLevels] = useState(spellData.spellInfo);
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    setEdit((prev) => !prev);
  };

  const handleUpdateSpell = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch("/api/spells", { spell, spellLevels });
    setEdit(false);
  };

  return (
    <Page>
      {spell ? (
        <>
          <div className="flex row items-center justify-between">
            <Link className="button" href={"/spells"}>
              Back
            </Link>
            <button className="button" type="button" onClick={handleEditMode}>
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>
          <hr />
          <form
            className="flex flex-col gap-1"
            onSubmit={(e) => handleUpdateSpell(e)}
          >
            <div className="flex row items-start">
              <label className="view-label">Name: </label>
              <input
                type="text"
                value={spell.name}
                onChange={(e) =>
                  setSpell((prev) => ({ ...prev, name: e.target.value }))
                }
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
                rows={3}
              />
            </div>
            <div className="table-container">
              <table className="border-collapse border border-slate-300">
                <thead className="bg-teal-500  text-white">
                  <tr>
                    <th className="border border-slate-300 p-1 w-5">Level</th>
                    <th className="border border-slate-300 p-1 w-10">MP</th>
                    <th className="border border-slate-300 p-1 w-28">Range</th>
                    <th className="border border-slate-300 p-1 w-28">
                      Duration
                    </th>
                    <th className="border border-slate-300 p-1">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {spellLevels.map((s, i) => (
                    <tr key={s.id}>
                      <td className="border border-slate-300 p-1">
                        <input
                          type="text"
                          disabled={!edit}
                          value={spellLevels[i].level}
                          onChange={(e) =>
                            setSpellLevels((prev) => [
                              ...prev.slice(0, i),
                              { ...prev[i], name: e.target.value },
                              ...prev.slice(i + 1),
                            ])
                          }
                        />
                      </td>
                      <td className="border border-slate-300 p-1">
                        <input
                          type="text"
                          disabled={!edit}
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
                          disabled={!edit}
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
                          disabled={!edit}
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
                          disabled={!edit}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {edit && (
              <div className="flex flex-row items-center justify-end">
                <button type="button" className="button">
                  Submit
                </button>
              </div>
            )}
          </form>
          <hr />
        </>
      ) : (
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      )}
    </Page>
  );
};

export default ViewSpell;

export const getServerSideProps = async (req) => {
  const spellId = req.query.spellId;
  const { data } = await axios.get(`/api/spells/?id=${spellId}`);
  return {
    props: {
      spellData: data,
    },
  };
};
