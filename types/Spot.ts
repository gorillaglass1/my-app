export interface Spot {
    spotId: string,
    name: string,
    area: string,
    address: string,
    category: string | null,
    latitude: number | null,
    longitude: number | null,
    tell: string | null
    workDay: string | null,
    workTime: string | null,
    parking: string | null
}