"use client";

import React, { useState } from "react";
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
              : "bg-transparent border border-gray-600 hover:scale-105 hover:bg-gray-600"
            } w-80 h-12 mt-4 text-left transition-all lg:w-[350px] tracking-widest`}
          onClick={() => setActiveTab(option.id)}
        >
          <span className="px-6 text-gray-300"> {option.span} </span>
          {option.label}
        </button>
      ))}
    </>
  );
};

const PlanetStats = ({ planet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 lg:mt-12">
      {Object.entries(planet).map((entry) => (
        // change display at md breakpoint
        <div
          key={entry[0]}
          className="flex justify-between items-center border border-gray-600 p-6 md:flex-col  md:items-start md:justify-start"
        >
          {/* <div className="border border-gray-600 p-6 md:flex md:justify-center md:items-center"> */}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <div className="items-center text-center md:flex gap-10 lg:gap-0 lg:flex-col my-4 lg:my-0">
          <article className="lg:w-[350px] md:text-left lg:self-end">
            <h1 className="text-6xl font-bold">{planet.name.toUpperCase()}</h1>
            <p className="text-md my-4 text-gray-300 md:h-36">{renderContent()}</p>
            <div className="flex items-center text-gray-400 justify-center md:justify-start">
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
          </article>
          <div className="hidden md:block lg:text-end">
            <ButtonList
              activeTab={activeTab}
              planetColor={planetColor}
              setActiveTab={setActiveTab}
            />
          </div>
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
