import React, { useState, useEffect } from "react";
import Page from "@/components/Page";

export default function Home() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTalents = async () => {
      const res = await fetch(`/api/talents`);
      const data = await res.json();
      setTalents(data);
      setLoading(false);
    };
    getTalents();
  }, []);

  return (
    <Page>
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      ) : talents?.length ? (
        talents.map((t) => (
          <div key={t.id} className="flex flex-col gap-0 my-2">
            <p>
              <span className="font-bold">Name: </span>
              {t.name}
            </p>
            <p>
              <span className="font-bold">Tier: </span>
              {t.tier}
            </p>
            <p>
              <span className="font-bold">Prerequisities: </span>
              {t.prerequisites === null ? "None" : t.prerequisites}
            </p>
            <p>
              <span className="font-bold">Cost: </span>
              {t.cost} {t.cost === 1 ? "point" : "points"}
            </p>
            <p>
              <span className="font-bold">Ranks: </span>
              {t.ranks}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {t.description}
            </p>
            <hr className="my-2" />
          </div>
        ))
      ) : (
        <p>No talents</p>
      )}
    </Page>
  );
}
