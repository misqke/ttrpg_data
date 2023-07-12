import React, { useState } from "react";
import Page from "@/components/Page";
import axios from "axios";

import { useRouter } from "next/router";

const NewSpell = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tier, setTier] = useState(1);
  const [range, setRange] = useState("");
  const [duration, setDuration] = useState("Instantanious");
  const [casting_time, setCasting_time] = useState("1 Action");
  const [magic_points, setMagic_points] = useState("");
  const [concentration, setConcentration] = useState(false);
  const [description, setDescription] = useState("");
  const [upcast, setUpcast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/spells", {
      name,
      tier,
      range,
      duration,
      casting_time,
      magic_points,
      concentration,
      description,
      upcast,
    });
    router.push("/spells");
  };

  return (
    <Page>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <div>
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="tier">
            Tier
          </label>
          <input
            id="tier"
            type="number"
            min="1"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="range">
            Range
          </label>
          <input
            id="range"
            type="text"
            min="1"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="duration">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="casting_time">
            Casting Time
          </label>
          <input
            id="casting_time"
            type="text"
            value={casting_time}
            onChange={(e) => setCasting_time(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="magic_points">
            Magic Points
          </label>
          <input
            id="magic_points"
            type="number"
            value={magic_points}
            onChange={(e) => setMagic_points(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="concentration">
            Concentration
          </label>
          <select
            id="concentration"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
        <div>
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full"
            id="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="upcast">
            Upcast
          </label>
          <textarea
            className="w-full"
            id="description"
            value={upcast}
            rows={5}
            onChange={(e) => setUpcast(e.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
};

export default NewSpell;
