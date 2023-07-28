import React, { useState } from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import Link from "next/link";

const ViewCombatManeuver = ({ combatManeuverData }) => {
  const [originalCombatManeuver, setOriginalCombatManeuver] =
    useState(combatManeuverData);
  const [combatManeuver, setCombatManeuver] = useState(combatManeuverData);
  const [edit, setEdit] = useState(false);

  const handleEditMode = () => {
    if (edit) {
      setCombatManeuver(originalCombatManeuver);
    }
    setEdit((prev) => !prev);
  };

  const handleUpdateCombatManeuver = async (e) => {
    e.preventDefault();
    const { data } = await axios.put("/api/combatManeuvers", combatManeuver);
    setOriginalCombatManeuver(data);
    setEdit(false);
  };

  return (
    <Page>
      <div className="flex row items-center justify-between">
        <Link className="button" href={"/combat_maneuvers"}>
          Back
        </Link>
        <button className="button" type="button" onClick={handleEditMode}>
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => handleUpdateCombatManeuver(e)}
      >
        <div className="flex row items-start">
          <label className="view-label">Name: </label>
          <input
            type="text"
            value={combatManeuver.name}
            onChange={(e) =>
              setCombatManeuver((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={!edit}
          />
        </div>
        <div className="flex row items-start">
          <label className="view-label">Description: </label>
          <textarea
            value={combatManeuver.description}
            onChange={(e) =>
              setCombatManeuver((prev) => ({
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
      <CommentBox topic="combatManeuvers" id={combatManeuver.id} />
    </Page>
  );
};

export default ViewCombatManeuver;

export const getServerSideProps = async (req) => {
  const combatManeuverId = req.query.combatManeuverId;
  const { data } = await axios.get(
    `/api/combatManeuvers/?id=${combatManeuverId}`
  );
  return {
    props: {
      combatManeuverData: data,
    },
  };
};
