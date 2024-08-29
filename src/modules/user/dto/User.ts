import { Gender } from "../enum/Gender";
import { UserLocation } from "./UserLocation";

export type User = {
    uuid: string,
    email: string,
    gender: Gender,
    title: string,
    first_name: string,
    last_name: string,
    nat: string,
    location?: UserLocation,
    age: number,
    dob: Date,
    phone: string,
    cell: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    },
    id: {
        name: string,
        value: string,
    },
    created_at?: Date,
    updated_at?: Date,
}