import { PlanetString } from "../types/planet";

export default function selectPlanetColor(planet: PlanetString) {
  if (planet === "mercury") return "bg-gray-400";
  if (planet === "venus") return "bg-yellow-400";
  if (planet === "earth") return "bg-blue-400";
  if (planet === "mars") return "bg-red-400";
  if (planet === "jupiter") return "bg-yellow-600";
  if (planet === "saturn") return "bg-yellow-500";
  if (planet === "uranus") return "bg-blue-500";
  if (planet === "neptune") return "bg-blue-600";
}
