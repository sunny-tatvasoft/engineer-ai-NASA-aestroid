import { AxiosResponse } from "axios";
import { Asteroid } from "../components/asteroid/AsteroidForm";
import { ASTEROID_API_BASE_URL,ASTEROID_API_ACCESS_KEY } from "../utils/constants";
import http from "./http.service";

const apiEndPoint = ASTEROID_API_BASE_URL;

function appendNasaApiKey():string{
    return "?api_key=" + ASTEROID_API_ACCESS_KEY;
}

export function getAsteroids():Promise<AxiosResponse<any>>{
    return http.get(apiEndPoint + "browse" + appendNasaApiKey());
}

export function getAsteroidByID(id: string):Promise<AxiosResponse<Asteroid>>{
    return http.get(apiEndPoint + id + appendNasaApiKey());
}
