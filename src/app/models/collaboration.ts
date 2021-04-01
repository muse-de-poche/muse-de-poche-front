import { Composer } from 'src/app/models/composer';
import { Composition } from 'src/app/models/composition';
export interface Collaboration {
    id: number,
    demandDate: Date,
    validatedDate: Date,
    lastUpdate: Date,
    composition: Composition,
    composer: Composer,
    status: String,
    right: String,
    text: String
}
