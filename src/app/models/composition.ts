import { Composer } from './composer'
import { Collaboration } from './collaboration'
import { Metronome } from './metronome'
import { Track } from './track'

export interface Composition {
        id: number,
        title: String,
        createdDate: Date,
        lastUpdate: Date,
        playsNumber: number,
        owner: Composer,
        collaborations?: Collaboration[],
        metronome?: Metronome,
        tracks?: Track[],
        blobPath: Blob
}
