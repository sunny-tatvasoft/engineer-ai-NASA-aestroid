import React from 'react';
import { useLocation } from "react-router-dom";
import { Asteroid } from './AsteroidForm';

export interface AsteroidDataProps {
}
export interface AsteroidDatas {
    astroidData :  Asteroid
}
 
const AsteroidData: React.SFC = () => {
    const location = useLocation<AsteroidDatas>();
    console.log(location.state.astroidData.name);
    let is_potentially_hazardous_asteroid;
    if (location.state.astroidData.is_potentially_hazardous_asteroid) {
        is_potentially_hazardous_asteroid = <h1>True</h1>;
    } else {
        is_potentially_hazardous_asteroid = <h1>False</h1>;
    }
    return ( 
        <div>
            <h1>name :- {location.state.astroidData.name}</h1>
            <h2>nasa _ipl url:- {location.state.astroidData.nasa_jpl_url}</h2>
          {is_potentially_hazardous_asteroid}
          
    </div>
     );
}
 
export default AsteroidData;