interface SumProps {
    a: number;
    b: number;
}

export function sum(a: number, b: number): number {
    return a + b;
}

export default function Sum({ a, b }: SumProps) {
    return (
        <div>
            <h2>合計</h2>
            <p data-testid="result">
                {a} + {b} = {sum(a, b)}
            </p>
        </div>
    );
}
