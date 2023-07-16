import React, { useState } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import Link from "next/link";

const ViewArcaneSpecialization = ({ arcaneSpecializationData }) => {
  const [originalArcaneSpecialization, setOriginalArcaneSpecialization] =
    useState(arcaneSpecializationData);
  const [arcaneSpecialization, setArcaneSpecialization] = useState(
    arcaneSpecializationData
  );
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    if (edit) {
      setArcaneSpecialization(originalArcaneSpecialization);
    }
    setEdit((prev) => !prev);
  };

  const handleUpdateArcaneSpecialization = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      "/api/arcaneSpecializations",
      arcaneSpecialization
    );
    setOriginalArcaneSpecialization(data);
    setEdit(false);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <Link className="button" href={"/arcane_specializations"}>
          Back
        </Link>
        <button className="button" type="button" onClick={handleEditMode}>
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => handleUpdateArcaneSpecialization(e)}
      >
        <div className="flex row items-start">
          <label className="view-label">School: </label>
          <input
            type="text"
            value={arcaneSpecialization.school}
            onChange={(e) =>
              setArcaneSpecialization((prev) => ({
                ...prev,
                school: e.target.value,
              }))
            }
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={arcaneSpecialization.description}
            onChange={(e) =>
              setArcaneSpecialization((prev) => ({
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
      <CommentBox topic="arcaneSpecializations" id={arcaneSpecialization.id} />
    </Page>
  );
};

export default ViewArcaneSpecialization;

export const getServerSideProps = async (req) => {
  const arcaneSpecializationId = req.query.arcaneSpecializationId;
  const { data } = await axios.get(
    `/api/arcaneSpecializations/?id=${arcaneSpecializationId}`
  );
  return {
    props: {
      arcaneSpecializationData: data,
    },
  };
};
