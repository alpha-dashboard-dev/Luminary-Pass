
export const parseDate = (date:string) => {

    const [day, month, year] = date.split("-");

    return new Date(
        `${year}-${month}-${day}T00:00:00`
    );

}