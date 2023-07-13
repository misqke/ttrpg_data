import React, { useState, useEffect } from "react";
import Page from "@/components/Page";

export default function Home() {
  return (
    <Page>
      <h1 className="text-2xl text-bolder">Character Creation</h1>
      <hr />
      <section>
        <h2 className="text-lg text-bold">Ability Scores</h2>
        <p>
          Standard point buy method. All scores start at 8 and you have 27
          points to spend. No score can exceed 15.
        </p>
      </section>
    </Page>
  );
}
