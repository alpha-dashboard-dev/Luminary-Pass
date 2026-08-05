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

    let day: number;
    let month: number;
    let year: number;

    // YYYY-MM-DD
    const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);

    if (ymd) {
        year = Number(ymd[1]);
        month = Number(ymd[2]);
        day = Number(ymd[3]);
    } else {
        // DD-MM-YYYY
        const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(text);
        if (!dmy) {
            throw new Error(
                "Invalid date. Use DD-MM-YYYY or YYYY-MM-DD"
            );
        }
        day = Number(dmy[1]);
        month = Number(dmy[2]);
        year = Number(dmy[3]);
    }

    // Validate actual calendar date
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        throw new Error("Invalid date");
    }
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

// add hours from now
export const addHoursToNow = (hours: number): Date => {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
};

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