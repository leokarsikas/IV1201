interface SumParams {
    a: number;
    b: number;
}

export function sum({ a, b }: SumParams): number {
    return a + b +1;
}