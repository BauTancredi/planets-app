import { PlanetStats as IPlanetStats } from "../../../types/planet";

export default function PlanetStats({ planet }: { planet: IPlanetStats }) {
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
}
