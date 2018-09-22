import { Entity } from './entity';

export interface Country extends Entity {
    name: string;
    epiIndex: number;
    continent?: string;
}
