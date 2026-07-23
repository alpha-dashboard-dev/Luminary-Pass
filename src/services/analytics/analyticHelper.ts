import { fn, col, literal } from "sequelize";

export default {

    count(column = "*") {
        return fn("COUNT", col(column));
    },

    countDistinct(column: string) {
        return fn("COUNT", fn("DISTINCT", col(column)));
    },

    avg(column: string) {
        return fn("AVG", col(column));
    },

    sum(column: string) {
        return fn("SUM", col(column));
    },

    max(column: string) {
        return fn("MAX", col(column));
    },

    min(column: string) {
        return fn("MIN", col(column));
    },

    month(column: string) {
        return fn("DATE_TRUNC", "month", col(column));
    },

    year(column: string) {
        return fn("DATE_TRUNC", "year", col(column));
    },

    literal(sql: string) {
        return literal(sql);
    }

}