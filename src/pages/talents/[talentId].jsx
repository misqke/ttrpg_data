import React from "react";
import Page from "@/components/Page";
import axios from "axios";

const ViewTalent = ({ talent }) => {
  return (
    <Page>
      <p>
        <span className="font-bold">Name: </span>
        {talent.name}
      </p>
      <p>
        <span className="font-bold">Tier: </span>
        {talent.tier}
      </p>
      <p>
        <span className="font-bold">Ranks: </span>
        {talent.ranks}
      </p>
      <p>
        <span className="font-bold">Cost: </span>
        {talent.cost}
      </p>
      <p>
        <span className="font-bold">Prerequisites: </span>
        {talent.prerequisites !== null ? talent.prerequisites : "None"}
      </p>
      <p>
        <span className="font-bold">Description: </span>
        {talent.description}
      </p>
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
