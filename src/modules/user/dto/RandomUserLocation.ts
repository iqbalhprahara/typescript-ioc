import { UserLocation } from "./UserLocation";

export type RandomUserLocation = Omit<UserLocation, 'city' | "country" | "city_uuid" | "country_uuid"> & { country: string, city: string };