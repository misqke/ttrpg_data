import React from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";

const CombatRules = () => {
  return (
    <Page>
      <h1>Combat Rules</h1>
      <hr />
      <CommentBox topic="combatRules" id={0} />
    </Page>
  );
};

export default CombatRules;
