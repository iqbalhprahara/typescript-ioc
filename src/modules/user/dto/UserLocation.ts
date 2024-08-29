import { City } from "@modules/location/dto/City"
import { Country } from "@modules/location/dto/Country"

export type UserLocation = {
    street_number: string,
    street_name: string,
    city?: City,
    city_uuid: string,
    country?: Country,
    country_uuid: string,
    postcode: string,
    coordinates: {
        latitude: number,
        longitude: number,
    },
    timezone: {
        offset: string,
        description: string,
    }
}