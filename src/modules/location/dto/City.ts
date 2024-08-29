import { Country } from "./Country"

export type City = {
    uuid?: string,
    country?: Country,
    country_uuid: string,
    name: string,
    created_at?: Date,
    updated_at?: Date,
}