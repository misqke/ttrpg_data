import React from "react";
import { useRouter } from "next/router";

const EditTalent = () => {
  const router = useRouter();
  return <div>{router.query.talentId}</div>;
};

export default EditTalent;
