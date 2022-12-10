"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import planets from "../../data/planets.json";

const BUTTON_OPTIONS = [
  {
    id: "overview",
    span: "01",
    label: "OVERVIEW",
  },
  {
    id: "internal",
    span: "02",
    label: "INTERNAL STRUCTURE",
  },
  {
    id: "surface",
    span: "03",
    label: "SURFACE GEOLOGY",
  },
];

const ButtonList = ({ activeTab, setActiveTab, planetColor }) => {
  return (
    <>
      {BUTTON_OPTIONS.map((option) => (
        <button
          key={option.id}
          className={`${activeTab === option.id
              ? planetColor
              : "bg-transparent border border-gray-600 hover:scale-105"
            } w-full h-12 mt-4 text-left transition-all`}
          onClick={() => setActiveTab(option.id)}
        >
          <span className="px-6"> {option.span} </span>
          {option.label}
        </button>
      ))}
    </>
  );
};

const PlanetStats = ({ planet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
      {Object.entries(planet).map((entry) => (
        <div className="border border-gray-600 p-6">
          <p className="text-gray-400 text-sm tracking-widest">{entry[0].toUpperCase()}</p>
          <h3 className="text-4xl">{entry[1].toUpperCase()}</h3>
        </div>
      ))}
    </div>
  );
};

// set color depending on planet
const selectPlanetColor = (planet) => {
  if (planet === "mercury") return "bg-gray-400";
  if (planet === "venus") return "bg-yellow-400";
  if (planet === "earth") return "bg-blue-400";
  if (planet === "mars") return "bg-red-400";
  if (planet === "jupiter") return "bg-yellow-600";
  if (planet === "saturn") return "bg-yellow-500";
  if (planet === "uranus") return "bg-blue-500";
  if (planet === "neptune") return "bg-blue-600";
};

export async function generateStaticParams() {
  return planets.map((planet) => ({
    planet: planet.name.toLowerCase(),
  }));
}

const PlanetPage = ({ params }: { params: { planet: string } }) => {
  const planet = planets.find((planet) => planet.name.toLowerCase() === params.planet);
  const [activeTab, setActiveTab] = useState<"overview" | "internal" | "surface">("overview");
  const planetColor = selectPlanetColor(params.planet);

  if (!planet) {
    return notFound();
  }

  const renderContent = () => {
    if (activeTab === "overview") {
      return planet.overview.content;
    } else if (activeTab === "internal") {
      return planet.structure.content;
    } else if (activeTab === "surface") {
      return planet.geology.content;
    }
  };

  const handlePlanetSource = () => {
    if (activeTab === "overview") {
      return planet.overview.source;
    } else if (activeTab === "internal") {
      return planet.structure.source;
    } else if (activeTab === "surface") {
      return planet.geology.source;
    }
  };

  const handlePlanetImage = () => {
    if (activeTab === "internal") return planet.images.internal;

    return planet.images.planet;
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center relative">
          <Image
            alt={planet.name}
            className="h-[300px] w-[300px]"
            height={100}
            src={handlePlanetImage()}
            width={100}
          />
          {activeTab === "surface" && (
            <Image
              alt={planet.name}
              className="h-[150] w-[100px] absolute bottom-0 right"
              height={100}
              src={planet.images.geology}
              width={100}
            />
          )}
        </div>
        <div className="w-full flex justify-end">
          <article className="text-left w-[350px]">
            <h1 className="text-6xl font-bold">{planet.name.toUpperCase()}</h1>
            <p className="text-md my-4 text-gray-300 h-36">{renderContent()}</p>
            <div className="flex items-center text-gray-400">
              <p className="text-sm mr-2">
                Source: &nbsp;
                <a
                  className="underline font-bold"
                  href={handlePlanetSource()}
                  rel="noreferrer"
                  target="_blank"
                >
                  Wikipedia
                </a>
              </p>
              <Image
                alt="Wikipedia"
                className="mt-1"
                height={10}
                src="/icon-source.svg"
                width={10}
              />
            </div>
            <ButtonList
              activeTab={activeTab}
              planetColor={planetColor}
              setActiveTab={setActiveTab}
            />
          </article>
        </div>
      </div>
      <PlanetStats
        planet={{
          rotation: planet.rotation,
          revolution: planet.revolution,
          radius: planet.radius,
          temperature: planet.temperature,
        }}
      />
    </div>
  );
};

export default PlanetPage;
