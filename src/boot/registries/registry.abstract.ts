import { AwilixContainer } from "awilix";

abstract class Registry {
    protected container: AwilixContainer;

    constructor(container: AwilixContainer) {
        this.container = container;
    }

    /**
     * The method to register any registry
     */
    public abstract register(): void;
}

export default Registry;