import React, { useState } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import Link from "next/link";

const ViewFightingStyle = ({ fightingStyleData }) => {
  const [originalFightingStyle, setOriginalFightingStyle] =
    useState(fightingStyleData);
  const [fightingStyle, setFightingStyle] = useState(fightingStyleData);
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    if (edit) {
      setFightingStyle(originalFightingStyle);
    }
    setEdit((prev) => !prev);
  };

  const handleUpdateFightingStyle = async (e) => {
    e.preventDefault();
    const { data } = await axios.put("/api/fightingStyles", fightingStyle);
    setOriginalFightingStyle(data);
    setEdit(false);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <Link className="button" href={"/fighting_styles"}>
          Back
        </Link>
        <button className="button" type="button" onClick={handleEditMode}>
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => handleUpdateFightingStyle(e)}
      >
        <div className="flex row items-start">
          <label className="view-label">Name: </label>
          <input
            type="text"
            value={fightingStyle.name}
            onChange={(e) =>
              setFightingStyle((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={fightingStyle.description}
            onChange={(e) =>
              setFightingStyle((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            disabled={!edit}
            rows={3}
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
      <CommentBox topic="fightingStyles" id={fightingStyle.id} />
    </Page>
  );
};

export default ViewFightingStyle;

export const getServerSideProps = async (req) => {
  const fightingStyleId = req.query.fightingStyleId;
  const { data } = await axios.get(
    `/api/fightingStyles/?id=${fightingStyleId}`
  );
  return {
    props: {
      fightingStyleData: data,
    },
  };
};
