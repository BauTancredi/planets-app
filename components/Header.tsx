import Link from "next/link";
import React from "react";
import planets from "../data/planets.json";

const Header = () => {
  return (
    <header className="p-4" style={{ display: "flex" }}>
      <h1>Header</h1>
      <ul style={{ display: "flex" }}>
        {planets.map((planet) => (
          <li key={planet.name}>
            <Link href={`/${planet.name.toLowerCase()}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
