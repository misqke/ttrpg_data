import React from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";

const RestingRules = () => {
  return (
    <Page>
      <h1>Resting Rules</h1>
      <hr />
      <CommentBox topic="restingRules" id={0} />
    </Page>
  );
};

export default RestingRules;
