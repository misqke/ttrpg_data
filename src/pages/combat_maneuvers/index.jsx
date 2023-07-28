import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ combatManeuvers }) {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/combat_maneuvers/${id}`);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Combat Maneuvers</h1>
        <Link className="button" href={"/combat_maneuvers/NewCombatManeuver"}>
          New Combat Maneuvers
        </Link>
      </div>
      <hr />
      {combatManeuvers?.length ? (
        <>
          <div className="table-container">
            <table className="border-collapse border border-slate-300">
              <thead className="bg-teal-500  text-white">
                <tr>
                  <th className="border border-slate-300 p-1 w-44">Name</th>
                  <th className="border border-slate-300 p-1">Description</th>
                </tr>
              </thead>
              <tbody>
                {combatManeuvers.map((cm) => (
                  <tr
                    className="clickable"
                    key={cm.id}
                    onClick={(e) => handleRowClick(cm.id)}
                  >
                    <td className="border border-slate-300 p-1">{cm.name}</td>
                    <td className="border border-slate-300 p-1">
                      {cm.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No Combat Maneuvers</p>
      )}
      <hr />
      <CommentBox topic="combatManeuvers" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/combatManeuvers");
  return {
    props: {
      combatManeuvers: data,
    },
  };
};
