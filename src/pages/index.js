import Image from "next/image";
import Page from "@/components/Page";
import { PrismaClient } from "@prisma/client";

export default function Home({ abilities }) {
  return (
    <Page>
      {abilities?.length ? (
        abilities.map((a) => (
          <div key={a.id} className="flex flex-col gap-0 my-2">
            <p>
              <span className="font-bold">Name: </span>
              {a.name}
            </p>
            <p>
              <span className="font-bold">Tier: </span>
              {a.tier}
            </p>
            <p>
              <span className="font-bold">Prerequisities: </span>
              {a.prerequisite}
            </p>
            <p>
              <span className="font-bold">Cost: </span>
              {a.points} points
            </p>
            <p>
              <span className="font-bold">Ranks: </span>
              {a.ranks}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {a.description}
            </p>
            <hr className="my-2" />
          </div>
        ))
      ) : (
        <p>No Abilities</p>
      )}
    </Page>
  );
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const abilities = await prisma.ability.findMany();
  return {
    props: {
      abilities: abilities.sort((a, b) =>
        a.tier < b.tier ? 1 : a.tier > b.tier ? -1 : 0
      ),
    },
  };
};
