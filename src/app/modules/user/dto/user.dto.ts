export type User = {
    uuid: string,
    gender: string,
    name: {
        title: string,
        first: string,
        last: string,
    },
    location: {
        street: {
            number: number,
            name: string,
        },
        city: string,
        state: string,
        country: string,
        postcode: number,
        coodinates: {
            latitude: number,
            longittude: number,
        },
        timezone: {
            offset: string,
            description: string,
        }
    },
    age: number,
    createdAt: Date,
    updatedAt?: Date,
}