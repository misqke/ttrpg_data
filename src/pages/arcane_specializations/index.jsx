import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function ArcaneSpecializations({ arcaneSpecializations }) {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/arcane_specializations/${id}`);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Arcane Specializations</h1>
        <Link
          className="button"
          href={"/arcane_specializations/NewArcaneSpecialization"}
        >
          New Arcane Specialization
        </Link>
      </div>
      <hr />
      {arcaneSpecializations?.length ? (
        <>
          <div className="table-container">
            <table className="border-collapse border border-slate-300">
              <thead className="bg-teal-500  text-white">
                <tr>
                  <th className="border border-slate-300 p-1 w-44">School</th>
                  <th className="border border-slate-300 p-1">Description</th>
                </tr>
              </thead>
              <tbody>
                {arcaneSpecializations.map((t) => (
                  <tr
                    className="clickable"
                    key={t.id}
                    onClick={(e) => handleRowClick(t.id)}
                  >
                    <td className="border border-slate-300 p-1">{t.school}</td>
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
        <p>No arcane specializations</p>
      )}
      <hr />
      <CommentBox topic="arcaneSpecializations" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/arcaneSpecializations");
  return {
    props: {
      arcaneSpecializations: data,
    },
  };
};
