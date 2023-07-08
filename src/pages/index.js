import React, { useState, useEffect } from "react";
import Page from "@/components/Page";

const url = "https://ttrpg-data.netlify.app";
// const url = "http://localhost:3000";

export default function Home() {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const getAbilities = async () => {
      const res = await fetch(`${url}/api/abilities`);
      const data = await res.json();
      setAbilities(data);
    };
    getAbilities();
  }, []);

  return (
    <Page>
      {abilities?.length ? (
        abilities.map((a) => (
          <div key={a.id} className="flex flex-col gap-0 my-2">
            <p>
              <span className="font-bold">Name: </span>
              {a.name}
            </p>
            <p>
              <span className="font-bold">Tier: </span>
              {a.tier}
            </p>
            <p>
              <span className="font-bold">Prerequisities: </span>
              {a.prerequisite}
            </p>
            <p>
              <span className="font-bold">Cost: </span>
              {a.points} points
            </p>
            <p>
              <span className="font-bold">Ranks: </span>
              {a.ranks}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {a.description}
            </p>
            <hr className="my-2" />
          </div>
        ))
      ) : (
        <p>No Abilities</p>
      )}
    </Page>
  );
}
