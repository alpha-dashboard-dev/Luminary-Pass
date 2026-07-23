import { fn, col, literal } from "sequelize";

class AnalyticsHelper {

    count(column = "*") {
        return fn("COUNT", col(column));
    }

    countDistinct(column: string) {
        return fn("COUNT", fn("DISTINCT", col(column)));
    }

    avg(column: string) {
        return fn("AVG", col(column));
    }

    sum(column: string) {
        return fn("SUM", col(column));
    }

    max(column: string) {
        return fn("MAX", col(column));
    }

    min(column: string) {
        return fn("MIN", col(column));
    }

    dateTrunc(period: "day" | "week" | "month" | "year", column: string) {
        return fn("DATE_TRUNC", period, col(column));
    }

    literal(sql: string) {
        return literal(sql);
    }
}

export default new AnalyticsHelper();