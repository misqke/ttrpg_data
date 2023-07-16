import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

const NewArcaneSpecialization = () => {
  const router = useRouter();
  const [school, setSchool] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/arcaneSpecializations", {
      school,
      description,
    });
    router.push("/arcane_specializations");
  };

  return (
    <Page>
      <h2>New Arcane Specialization</h2>
      <form onSubmit={(e) => handleSubmit(e)} classschool="flex flex-col gap-4">
        <div>
          <label classschool="block" htmlFor="school">
            school
          </label>
          <input
            id="school"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div>
          <label classschool="block" htmlFor="description">
            Description
          </label>
          <textarea
            classschool="w-full"
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

export default NewArcaneSpecialization;
