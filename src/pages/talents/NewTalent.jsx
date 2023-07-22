import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

const NewAbility = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tier, setTier] = useState(1);
  const [cost, setCost] = useState(1);
  const [ranks, setRanks] = useState(1);
  const [prerequisites, setPrerequisites] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/talents", {
      name,
      tier,
      cost,
      ranks,
      prerequisites,
      description,
    });
    router.push("/talents");
  };

  return (
    <Page>
      <h2>New Talent</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <div>
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="tier">
            Tier
          </label>
          <input
            id="tier"
            type="number"
            min="0"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="cost">
            Cost
          </label>
          <input
            id="cost"
            type="number"
            min="1"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="ranks">
            Ranks
          </label>
          <input
            id="ranks"
            type="number"
            min="1"
            value={ranks}
            onChange={(e) => setRanks(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="prerequisite">
            Prerequisites
          </label>
          <input
            id="prerequisite"
            type="text"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full"
            id="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="button mt-4 ms-auto" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
};

export default NewAbility;
