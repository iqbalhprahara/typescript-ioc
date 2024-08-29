export default interface Action {
    execute(...params: any): any;
}