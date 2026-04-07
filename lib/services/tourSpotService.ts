import { Spot } from "@/types/Spot";

export interface tourSpotService {
    register(spot: Spot): Promise<Spot>;
    findById(spotId: string): Promise<Spot>;
    findByArea(area: string): Promise<Spot[]>;
    findByName(name: string): Promise<Spot[]>;
    findAll(): Promise<Spot[]>;
    remove(spotId: string): Promise<void>;
}
