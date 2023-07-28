import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

const NewMetaMagic = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/metaMagic", {
      name,
      description,
    });
    router.push("/meta_magic");
  };

  return (
    <Page>
      <h2>New Meta Magic</h2>
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

export default NewMetaMagic;
