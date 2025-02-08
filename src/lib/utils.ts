export function cn(...strings: (string | undefined | null)[]) {
    return strings.filter(Boolean).map(s => s?.trim()).join(" ");
}