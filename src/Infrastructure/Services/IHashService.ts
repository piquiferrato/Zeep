export interface IHashService{
    safeCompare(a: any, b: any): boolean;
    make(password: string): string;
}