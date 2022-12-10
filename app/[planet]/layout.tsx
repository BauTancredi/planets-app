import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-10/12 mx-auto my-12">{children}</main>
    </>
  );
}
