import React from "react";
import planets from "../../data/planets.json";

export async function generateStaticParams() {
  return planets.map((planet) => ({
    planet: planet.name.toLowerCase(),
  }));
}

const PlanetPage = ({ params }: { params: { planet: string } }) => {
  const planet = planets.find(
    (planet) => planet.name.toLowerCase() === params.planet
  );

  return <div>{planet?.name}</div>;
};

export default PlanetPage;
