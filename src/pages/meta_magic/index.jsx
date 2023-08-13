import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Talent({ metaMagics }) {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/meta_magic/${id}`);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <h1>Meta Magic</h1>
        <Link className="button" href={"/meta_magic/NewMetaMagic"}>
          New Meta Magic
        </Link>
      </div>
      <hr />
      {metaMagics?.length ? (
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
                {metaMagics.map((mm) => (
                  <tr
                    className="clickable"
                    key={mm.id}
                    onClick={(e) => handleRowClick(mm.id)}
                  >
                    <td className="border border-slate-300 p-1">{mm.name}</td>
                    <td className="border border-slate-300 p-1">
                      {mm.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No Meta Magics</p>
      )}
      <hr />
      <CommentBox topic="metaMagic" id={0} />
    </Page>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("/api/metaMagic");
  return {
    props: {
      metaMagics: data,
    },
  };
};
