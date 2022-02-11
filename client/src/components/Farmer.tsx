import React from "react";

interface farmerProps {
  title: string;
  farmerLogo: string;
  farmerAPY: number | undefined;
  middleEl?: boolean;
}

export default function Farmer({
  title,
  farmerLogo,
  farmerAPY,
  middleEl,
}: farmerProps) {
  return (
    <div
      className={middleEl === true ? "yBorder farmerWrapper" : "farmerWrapper"}
    >
      <img src={farmerLogo} width={80} alt="" />
      <h1>
        {title}: {farmerAPY}%
      </h1>
    </div>
  );
}
