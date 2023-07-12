import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";
import Link from "next/link";

const ViewTalent = ({ talent }) => {
  const [name, setName] = useState(talent.name);
  const [tier, setTier] = useState(talent.tier);
  const [cost, setCost] = useState(talent.cost);
  const [ranks, setRanks] = useState(talent.ranks);
  const [prerequisites, setPrerequisites] = useState(
    talent.prerequisites || "None"
  );
  const [description, setDescription] = useState(talent.description);
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    setEdit((prev) => !prev);
  };

  const handleUpdateTalent = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch("/api/talents", {
      id: talent.id,
      name,
      tier,
      cost,
      ranks,
      prerequisites,
      description,
    });
    setEdit(false);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <Link className="button" href={"/talents"}>
          Back
        </Link>
        <button className="button" type="button" onClick={handleEditMode}>
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => handleUpdateTalent(e)}
      >
        <div className="flex row items-start">
          <label className="view-label">Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Tier: </label>
          <input
            type="number"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Cost: </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Ranks: </label>
          <input
            type="number"
            value={ranks}
            onChange={(e) => setRanks(e.target.value)}
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Prerequisites: </label>
          <input
            type="text"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!edit}
            rows={5}
          />
        </div>
        {edit && (
          <div className="flex flex-row items-center justify-end">
            <button type="button" className="button">
              Submit
            </button>
          </div>
        )}
      </form>
      <hr />
    </Page>
  );
};

export default ViewTalent;

export const getServerSideProps = async (req) => {
  const talentId = req.query.talentId;
  const { data } = await axios.get(`/api/talents/?id=${talentId}`);
  return {
    props: {
      talent: data,
    },
  };
};
