import { City } from "..";

export interface CityRepository {
    /**
     * Create new city data on repository
     * 
     * @param city 
     */
    create(city: City): City | Promise<City>;

    /**
     * Update current city data on repository
     * 
     * @param city 
     */
    update(city: City): City | Promise<City>;

    /**
     * Delete city on repository by the given uuid
     * 
     * @param uuid 
     */
    delete(uuid: string): boolean | Promise<boolean>;

    /**
     * Get city by the given uuid
     * 
     * @param uuid 
     */
    getByUuid(uuid: string): City | Promise<City>;

    /**
     * Find or create city by name and country uuid
     * 
     * @param name
     */
    findOrCreateByNameAndCountryUuid(name: string, countryUuid: string): City | Promise<City>;
}