import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Talent({ talents }) {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/talents/${id}`);
  };

  return (
    <Page>
      {talents?.length ? (
        <>
          <Link className="button" href={"/talents/NewTalent"}>
            New Talent
          </Link>
          <div className="table-container">
            <table className="border-collapse border border-slate-300">
              <thead className="bg-teal-500  text-white">
                <tr>
                  <th className="border border-slate-300 p-1">Tier</th>
                  <th className="border border-slate-300 p-1">Name</th>
                  <th className="border border-slate-300 p-1">Ranks</th>
                  <th className="border border-slate-300 p-1">Cost</th>
                  <th className="border border-slate-300 p-1">Prerequisites</th>
                  <th className="border border-slate-300 p-1">Description</th>
                </tr>
              </thead>
              <tbody>
                {talents.map((t) => (
                  <tr
                    className="clickable"
                    key={t.id}
                    onClick={(e) => handleRowClick(t.id)}
                  >
                    <td className="border border-slate-300 p-1">{t.tier}</td>
                    <td className="border border-slate-300 p-1">{t.name}</td>
                    <td className="border border-slate-300 p-1">{t.ranks}</td>
                    <td className="border border-slate-300 p-1">{t.cost}</td>
                    <td className="border border-slate-300 p-1">
                      {t.prerequisites}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {t.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No talents</p>
      )}
    </Page>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/talents`);
  const data = await res.json();
  return {
    props: {
      talents: data,
    },
  };
};