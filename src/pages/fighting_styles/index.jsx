import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ fightingStyles }) {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/fighting_styles/${id}`);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Fighting Styles</h1>
        <Link className="button" href={"/fighting_styles/NewFightingStyle"}>
          New Fighting Style
        </Link>
      </div>
      <hr />
      {fightingStyles?.length ? (
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
                {fightingStyles.map((t) => (
                  <tr
                    className="clickable"
                    key={t.id}
                    onClick={(e) => handleRowClick(t.id)}
                  >
                    <td className="border border-slate-300 p-1">{t.name}</td>
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
        <p>No fighting styles</p>
      )}
      <hr />
      <CommentBox topic="fightingStyles" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/fightingStyles");
  return {
    props: {
      fightingStyles: data,
    },
  };
};
