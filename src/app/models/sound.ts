import { Track } from "./track";

export interface Sound {
    id:number,
    position:number,
    file:Blob,
    name:String,
    track:Track
}
