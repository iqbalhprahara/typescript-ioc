import { RandomUserLocation } from "./RandomUserLocation";
import { User } from "./User";

export type RandomUser = Omit<User, 'location'> & { location: RandomUserLocation };