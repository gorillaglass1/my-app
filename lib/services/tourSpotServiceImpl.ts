import { Spot } from "@/types/Spot";
import { tourSpotService } from "./tourSpotService";
import { tourSpotRepository } from "../repositories/tourSpot";

export class tourSpotServiceImpl implements tourSpotService {
    constructor(private readonly repository: tourSpotRepository) {}

    async register(spot: Spot): Promise<Spot> {
        const newSpot: Spot = {
            spotId: spot.spotId,
            name: spot.name,
            area: spot.area,
            address: spot.address,
            longitude: spot.longitude ?? null,
            latitude: spot.latitude ?? null,
            category: spot.category ?? null,
            tell: spot.tell ?? null,
            workDay: spot.workDay ?? null,
            workTime: spot.workTime ?? null,
            parking: spot.parking ?? null,
        };
        await this.repository.save(newSpot);
        return newSpot;
    }

    async findById(spotId: string): Promise<Spot> {
        const spot = await this.repository.findById(spotId);
        if (spot == null) throw new Error(`ID(${spotId})에 해당하는 관광지를 찾을 수 없습니다.`);
        return spot;
    }

    async findByArea(area: string): Promise<Spot[]> {
        const spots = await this.repository.findAllByArea(area);
        if (spots == null) throw new Error(`지역(${area})에 해당하는 관광지가 없습니다.`);
        return spots;
    }

    async findByName(name: string): Promise<Spot[]> {
        const spots = await this.repository.findAllByName(name);
        if (spots == null) throw new Error(`이름(${name})에 해당하는 관광지가 없습니다.`);
        return spots;
    }

    async findAll(): Promise<Spot[]> {
        const spots = await this.repository.findAll();
        if (spots == null) throw new Error("등록된 관광지가 없습니다.");
        return spots;
    }

    async remove(spotId: string): Promise<void> {
        const spot = await this.repository.findById(spotId);
        if (spot == null) throw new Error(`ID(${spotId})에 해당하는 관광지를 찾을 수 없습니다.`);
        await this.repository.deleteById(spotId);
    }
}
