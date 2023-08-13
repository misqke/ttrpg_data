import React, { useState } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import Link from "next/link";

const ViewMetaMagic = ({ metaMagicData }) => {
  const [originalMetaMagic, setOriginalMetaMagic] = useState(metaMagicData);
  const [metaMagic, setMetaMagic] = useState(metaMagicData);
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    if (edit) {
      setCombatManeuver(originalMetaMagic);
    }
    setEdit((prev) => !prev);
  };

  const handleUpdateMetaMagic = async (e) => {
    e.preventDefault();
    const { data } = await axios.put("/api/metaMagic", metaMagic);
    setOriginalMetaMagic(data);
    setEdit(false);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <Link className="button" href={"/meta_magic"}>
          Back
        </Link>
        <button className="button" type="button" onClick={handleEditMode}>
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => handleUpdateMetaMagic(e)}
      >
        <div className="flex row items-start">
          <label className="view-label">Name: </label>
          <input
            type="text"
            value={metaMagic.name}
            onChange={(e) =>
              setMetaMagic((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={metaMagic.description}
            onChange={(e) =>
              setMetaMagic((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            disabled={!edit}
            rows={5}
          />
        </div>
        {edit && (
          <div className="flex flex-row items-center justify-end">
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        )}
      </form>
      <hr />
      <CommentBox topic="metaMagic" id={metaMagic.id} />
    </Page>
  );
};

export default ViewMetaMagic;

export const getServerSideProps = async (req) => {
  const metaMagicId = req.query.metaMagicId;
  const { data } = await axios.get(`/api/metaMagic/?id=${metaMagicId}`);
  return {
    props: {
      metaMagicData: data,
    },
  };
};
