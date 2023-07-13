import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ spells }) {
  const router = useRouter();
  console.log(spells);
  const handleRowClick = (id) => {
    router.push(`/spells/${id}`);
  };

  return (
    <Page>
      {spells?.length ? (
        <>
          <Link className="button" href={"/spells/NewSpell"}>
            New Spell
          </Link>
          <div className="table-container">
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
                {spells.map((s) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No spells</p>
      )}
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
