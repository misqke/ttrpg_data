import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import axios from "axios";

export default function Home({ lineage, background }) {
  return (
    <Page>
      <h1 className="text-2xl text-bolder">Character Creation</h1>
      <hr />
      <section>
        <h2 className="text-lg text-bold">Ability Scores</h2>
        <p>
          Standard point buy method. All scores start at 8 and you have 27
          points to spend. No score can exceed 15.
        </p>
      </section>
      <section>
        <h2 className="text-lg text-bold">Lineage</h2>
        <p>
          You have X number of lineage points to pucharse the abilities listed
          below with.
        </p>
        <div className="table-container">
          <table className="border-collapse border border-slate-300">
            <thead className="bg-teal-500  text-white">
              <tr>
                <th className="border border-slate-300 p-1">Name</th>
                <th className="border border-slate-300 p-1">Cost</th>
                <th className="border border-slate-300 p-1">Ranks</th>
                <th className="border border-slate-300 p-1">Description</th>
              </tr>
            </thead>
            <tbody>
              {lineage.map((l) => (
                <tr key={l.id}>
                  <td className="border border-slate-300 p-1">{l.name}</td>
                  <td className="border border-slate-300 p-1">
                    {l.cost} points
                  </td>
                  <td className="border border-slate-300 p-1">{l.ranks}</td>
                  <td className="border border-slate-300 p-1">
                    {l.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-lg text-bold">Background</h2>
        <p>
          You have X number of background points that can be spent on Tier 0
          Talents or the abilities listed below.
        </p>
        <div className="table-container">
          <table className="border-collapse border border-slate-300">
            <thead className="bg-teal-500  text-white">
              <tr>
                <th className="border border-slate-300 p-1">Name</th>
                <th className="border border-slate-300 p-1">Cost</th>
                <th className="border border-slate-300 p-1">Ranks</th>
                <th className="border border-slate-300 p-1">Description</th>
              </tr>
            </thead>
            <tbody>
              {background &&
                background.map((l) => (
                  <tr key={l.id}>
                    <td className="border border-slate-300 p-1">{l.name}</td>
                    <td className="border border-slate-300 p-1">
                      {l.cost} points
                    </td>
                    <td className="border border-slate-300 p-1">{l.ranks}</td>
                    <td className="border border-slate-300 p-1">
                      {l.description}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  );
}

export const getServerSideProps = async () => {
  const lineageData = await axios.get("/api/lineage");
  const backgroundData = await axios.get("/api/background");
  return {
    props: {
      lineage: lineageData.data,
      background: backgroundData.data,
    },
  };
};
