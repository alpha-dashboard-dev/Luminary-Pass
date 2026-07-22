
export const parseDate = (date:string) => {

    const [day, month, year] = date.split("-");

    return new Date(
        `${year}-${month}-${day}T00:00:00`
    );

}

export const normalizeDateOnly = (input: any): string => {

    if (!input) {
        throw new Error("Invalid date");
    }


    if (input instanceof Date) {

        if (isNaN(input.getTime())) {
            throw new Error("Invalid date");
        }

        return input.toISOString().split("T")[0];

    }


    const text = String(input).trim();


    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        return text;
    }


    // DD-MM-YYYY
    const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(text);

    if (dmy) {

        const [, day, month, year] = dmy;

        return `${year}-${month}-${day}`;

    }
    const parsed = new Date(text);
    if (isNaN(parsed.getTime())) {

        throw new Error("Invalid date");

    }

    return parsed.toISOString().split("T")[0];

}

export const normalizeTimeToHHMM = (input: any): string  => {
    const raw = input == null ? "" : String(input).trim();
    const match = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/.exec(raw);
    if (!match) {
        throw new Error(`Invalid format. Use HH:MM`);
    }
    return `${match[1]}:${match[2]}`;
}

export const normalizeTimeToHHMMSS = (input: any): string => {
    const raw = input == null ? "" : String(input).trim();
    const match = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(raw);
    if (!match) return raw;
    return `${match[1]}:${match[2]}:${match[3] || "00"}`;
}

export const normalizeDeadline =(input:any) =>{

    const date = normalizeDateOnly(input);

    return `${date}T23:59:59.000Z`;

}