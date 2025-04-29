export function cn(...strings: (string | undefined | null)[]) {
    return strings.filter(Boolean).map(s => s?.trim()).join(" ");
}

export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => i + start);
}