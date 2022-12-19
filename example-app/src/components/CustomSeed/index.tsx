import React from 'react';
import { Seed, SeedItem, IRenderSeedProps } from 'react-brackets';
import { CustomSeedTeam } from "./components/CustomSeedTeam";

export const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 14, minWidth: 125 }} className="seed">
      <SeedItem>
        <CustomSeedTeam name={seed.teams[0].name} wins={0} hasWon/>
        <CustomSeedTeam name={seed.teams[1].name} wins={1} />
      </SeedItem>
      <div style={{marginTop: "4px"}}>
        <span style={{color:"#7F8CA4", fontWeight: 500, fontSize: "12px"}}>Partida 01 &#x2022; MD 1</span>
      </div>
    </Seed>
  );
};