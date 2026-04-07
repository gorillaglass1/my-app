import { Spot } from "@/types/Spot";

export interface tourSpotRepository {
    save(spot: Spot): Promise<void>;
    findById(spotId: string): Promise<Spot | null>;
    findByName(name: string): Promise<Spot | null>;
    findAllByName(name: string): Promise<Spot[] | null>;
    findAllByArea(area: string): Promise<Spot[] | null>;
    findAll(): Promise<Spot[] | null>;
    deleteById(spotId: string): Promise<void>;
}