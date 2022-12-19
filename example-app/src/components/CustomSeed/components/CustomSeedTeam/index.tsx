import {  FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { SeedTeam } from 'react-brackets';

type ISeedTeamProps = {
  name?: string;
  icon?: string;
  wins?: number;
  hasWon?: boolean;
}

const CustomSeedTeam: FC<ISeedTeamProps> = ({ name, icon, wins, hasWon = false }) => {

  if(name){
    return (
      <SeedTeam className="seed-team" style={{
        padding: "1rem",
        borderLeft: hasWon ? "3px solid #46D314" : "3px solid transparent",
      }}>
        {icon ? (
          <img 
            src={icon} 
            width={16} 
            height={16} 
            style={{ borderRadius: "50%" }} 
            alt="user profile"
            />
        ) : (
          <FontAwesomeIcon 
            icon={faCircleUser} 
            style={{color:"#5B6983" , width: 16, height: 16 }} 
            />
        )}
        <span style={{ fontWeight:600, color: hasWon ? "#00D1FF" :"#5D697E" }}>{name}</span>
        <span style={{ fontWeight:600, color: "#7F8CA4"}}>{wins || "0"}</span>
      </SeedTeam>
    )
  }

  return (
    <SeedTeam className="seed-team" style={{ justifyContent: "center", borderLeft: "3px solid transparent", padding: "1rem" }}>
      <span style={{color: "#5D697E", fontStyle: "italic", fontWeight: 600 }}>BYE</span>
    </SeedTeam>
  )
};
 
export { CustomSeedTeam };