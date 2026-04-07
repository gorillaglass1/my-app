import { Spot } from "@/types/Spot";
import { tourSpotRepository } from "./tourSpot";

export class MemoryTourSpotRepository implements tourSpotRepository {
    private static store = new Map<string, Spot>();

    async save(spot: Spot): Promise<void> {
        MemoryTourSpotRepository.store.set(spot.spotId, spot);
    }

    async findById(spotId: string): Promise<Spot | null> {
        return MemoryTourSpotRepository.store.get(spotId) || null;
    }

    async findByName(name: string): Promise<Spot | null> {
        for (const spot of MemoryTourSpotRepository.store.values()) {
            if (spot.name === name) return spot;
        }
        return null;
    }

    async findAllByName(name: string): Promise<Spot[] | null> {
        const result = Array.from(MemoryTourSpotRepository.store.values()).filter(
            (spot) => spot.name.includes(name)
        );
        return result.length > 0 ? result : null;
    }

    async findAllByArea(area: string): Promise<Spot[] | null> {
        const result = Array.from(MemoryTourSpotRepository.store.values()).filter(
            (spot) => spot.area === area
        );
        return result.length > 0 ? result : null;
    }

    async findAll(): Promise<Spot[] | null> {
        const result = Array.from(MemoryTourSpotRepository.store.values());
        return result.length > 0 ? result : null;
    }

    async deleteById(spotId: string): Promise<void> {
        MemoryTourSpotRepository.store.delete(spotId);
    }

    clear(): void {
        MemoryTourSpotRepository.store.clear();
    }
}