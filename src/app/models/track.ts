import { Composition } from "./composition";
import { Sound } from "./sound";

export interface Track {
	id:number,
    duration:number,
    instrument:String,
    composition:Composition,
    sounds:Sound[]
}
