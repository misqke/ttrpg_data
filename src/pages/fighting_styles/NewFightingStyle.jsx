import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

const NewFightingStyle = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/fightingStyles", {
      name,
      description,
    });
    router.push("/fighting_styles");
  };

  return (
    <Page>
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

        <button className="button ms-auto" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
};

export default NewFightingStyle;
