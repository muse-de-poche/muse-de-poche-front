import { Track } from "./track";

export interface Sound {
    id:number,
    position:number,
    file:File,
    name:String,
    track:Track
}
