type Config<Type> = {
    +readonly [Property in keyof Type]: Type[Property]
}

export default Config;