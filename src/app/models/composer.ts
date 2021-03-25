import { Collaboration } from './collaboration';
import { Composition } from 'src/app/models/composition';
export interface Composer {
    id: number,
    pseudo: String,
    password: String,
    lastname: String,
    firstname: String,
    country: String,
    email: String,
    subscribedDate: Date,
    compositions?: Composition[],
    collaborations?: Collaboration[]

}
