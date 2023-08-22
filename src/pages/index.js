import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import axios from "axios";

export default function Home({ lineage, background }) {
  return (
    <Page>
      <h1 className="text-2xl text-bolder">Character Creation</h1>
      <a download href="characterSheet.pdf">
        Download Character Sheet
      </a>
      <hr />
      <section>
        <h2 className="text-lg text-bold">Ability Scores</h2>
        <p>
          Standard point buy method. All scores start at 8 and you have 27
          points to spend. No score can exceed 15.
        </p>
        <p>
          You start the game with a number of hit points equal to 8 + your CON
          modifier and a number of magic points equal to 8 + your WIS modifier.
        </p>
      </section>
      <section>
        <h2 className="text-lg text-bold">Lineage</h2>
        <p>
          You have 9 lineage points to pucharse the abilities listed below with.
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
                    {l.cost} {l.cost === 1 ? "point" : "points"}
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
          Choose 1 saving throw and 1 skill to gain proficiency in. You have 6
          background points that can be spent on Tier 0 Talents.
        </p>
      </section>
      <section>
        <h2>Leveling</h2>
        <p>
          You start the game with three talent points that can be spent on Tier
          0 or 1 talents.
        </p>
        <p>
          Whenever you gain a level you gain 2 talent points you can spend on
          any talents that you qualify for. You can also increase one ability
          score of your choice by 1. No ability score can exceed 16 until level
          6, 18 until level 11, 20 until level 16, or 22.
        </p>
        <p>
          Every odd level unlocks a new talent tier (tier 2 at level 3, tier 3
          at level 5, etc.)
        </p>
        <p>
          Each level you roll 1d8 and 1d6. Your max hit points increases by the
          total of one of the die rolls plus your CON modifier. Your max magic
          points increases by the total of the other die roll plus your WIS
          modifier. You choose which roll is applied to which after seeing the
          results.
        </p>
        <p>Proficiency bonus progresses the same as 5e.</p>
      </section>
      <CommentBox topic="character" id={0} />
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
