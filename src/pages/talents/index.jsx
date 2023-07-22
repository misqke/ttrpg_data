import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ talents }) {
  const router = useRouter();
  const [filteredTalents, setFilteredTalents] = useState([...talents]);

  const handleRowClick = (id) => {
    router.push(`/talents/${id}`);
  };

  const handleFilter = (e) => {
    const val = e.target.value;
    if (val === "all") {
      setFilteredTalents(talents);
    } else {
      setFilteredTalents(talents.filter((t) => t.tier == val));
    }
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Talents</h1>
        <Link className="button" href={"/talents/NewTalent"}>
          New Talent
        </Link>
      </div>
      <hr />
      <p>
        Talents are gained though lineage and background abilities as well as by
        spending talent points when you level up. New spell tiers are unlocked
        at every odd charcter level (tier 2 at level 3, tier 3 at level 5,
        etc.).
      </p>
      <hr />
      <div className="table-container">
        <div className="mb-4">
          <label htmlFor="talentTierSelect">Tier:</label>
          <select id="talentTierSelect" onChange={(e) => handleFilter(e)}>
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
              <th className="border border-slate-300 p-1">Ranks</th>
              <th className="border border-slate-300 p-1">Cost</th>
              <th className="border border-slate-300 p-1">Prerequisites</th>
              <th className="border border-slate-300 p-1">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTalents.length ? (
              filteredTalents.map((t) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p>No Talents</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr />
      <CommentBox topic="talents" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/talents");
  return {
    props: {
      talents: data,
    },
  };
};
