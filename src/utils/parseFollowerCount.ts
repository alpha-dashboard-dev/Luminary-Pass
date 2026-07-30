export function parseFollowerRange(range: string) {
    const [min, max] = range.split("-").map(v => v.trim());

    return {
        minFollowers: parseCount(min),
        maxFollowers: parseCount(max),
    };
}

function parseCount(value: string): number {
    const input = value.toLowerCase().trim();

    const match = input.match(/^(\d+(\.\d+)?)(k|m)?$/);

    if (!match) {
        throw new Error(`Invalid follower count: ${value}`);
    }

    const num = parseFloat(match[1]);
    const suffix = match[3];

    switch (suffix) {
        case "k":
            return Math.round(num * 1_000);
        case "m":
            return Math.round(num * 1_000_000);
        default:
            return Math.round(num);
    }
}