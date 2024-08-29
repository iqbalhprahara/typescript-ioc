import { Country } from "../dto/Country";

export interface CountryRepository {
    /**
     * Create new country data on repository
     * 
     * @param country 
     */
    create(country: Country): Country | Promise<Country>;

    /**
     * Update current country data on repository
     * 
     * @param country 
     */
    update(country: Country): Country | Promise<Country>;

    /**
     * Delete country on repository by the given uuid
     * 
     * @param uuid 
     */
    delete(uuid: string): boolean | Promise<boolean>;

    /**
     * Get country by the given uuid
     * 
     * @param uuid 
     */
    getByUuid(uuid: string): Country | Promise<Country>;

    /**
     * Find or create country by name
     * 
     * @param name
     */
    findOrCreateByName(name: string): Country | Promise<Country>;
}