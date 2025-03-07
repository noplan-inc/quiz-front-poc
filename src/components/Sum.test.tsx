import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sum, { sum } from "./Sum";

describe("sum関数", () => {
    it("2つの数値を正しく足し算する", () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(5, 7)).toBe(12);
        expect(sum(-1, 1)).toBe(0);
    });
});

describe("Sumコンポーネント", () => {
    it("正しく合計を表示する", () => {
        render(<Sum a={3} b={5} />);
        expect(screen.getByTestId("result")).toHaveTextContent("3 + 5 = 8");
    });
});
