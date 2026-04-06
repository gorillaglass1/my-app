import { Spot } from "@/types/Spot";

export interface tourSpot {
    getSpotList(area: string): Promise<Spot[] | null>
    getSpotListByName(name: string): Promise<Spot[] | null>
    getSpotByName(name: string): Promise<Spot | null>
}