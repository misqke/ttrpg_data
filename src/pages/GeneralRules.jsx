import React from "react";
import Page from "@/components/Page";
import CommentBox from "@/components/CommentBox";

const GeneralRules = () => {
  return (
    <Page>
      <h1>General Rules</h1>
      <hr />
      <CommentBox topic="generalRules" id={0} />
    </Page>
  );
};

export default GeneralRules;
