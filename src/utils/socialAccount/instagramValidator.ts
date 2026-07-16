const ACCOUNT_METRICS = [

    // Reach & Discovery
    "reach",
    "views",
    "content_views",

    // Followers
    "follower_count",
    "online_followers",
    "follows_and_unfollows",
    "follower_demographics",

    // Profile
    "profile_views",
    "website_clicks",
    "profile_links_taps",

    // Engagement
    "accounts_engaged",
    "total_interactions",
    "likes",
    "comments",
    "shares",
    "saves",
    "replies",

    // Audience
    "engaged_audience_demographics",
    "reached_audience_demographics"

];

const PERIODS = ["day", "lifetime"];

const METRIC_TYPES = ["total_value", "time_series"];

const TOTAL_VALUE_METRICS = ["profile_views", "accounts_engaged", "total_interactions"];

const LIFETIME_METRICS = ["online_followers", "follower_demographics", "engaged_audience_demographics", "reached_audience_demographics"];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const validateAccountInsights = (data: any) => {

    const {
        instagramId,
        pageAccessToken,
        metrics,
        period,
        metricType,
        since,
        until
    } = data;

    // Required fields

    if (!instagramId) {
        throw new Error("instagramId is required");
    }

    if (!pageAccessToken) {
        throw new Error("pageAccessToken is required");
    }

    if (!Array.isArray(metrics) || metrics.length === 0) {
        throw new Error("metrics must be a non-empty array");
    }

    // Metrics validation

    const invalidMetrics = metrics.filter(
        (metric: string) => !ACCOUNT_METRICS.includes(metric)
    );

    if (invalidMetrics.length) {
        throw new Error(
            `Invalid metrics: ${invalidMetrics.join(", ")}`
        );
    }

    // Period validation

    if (period && !PERIODS.includes(period)) {
        throw new Error(
            `Invalid period. Allowed values: ${PERIODS.join(", ")}`
        );
    }

    // Metric type validation

    if (metricType && !METRIC_TYPES.includes(metricType)) {
        throw new Error(
            `Invalid metricType. Allowed values: ${METRIC_TYPES.join(", ")}`
        );
    }

    // Date format

    if (since && !DATE_REGEX.test(since)) {
        throw new Error(
            "since must be in YYYY-MM-DD format"
        );
    }

    if (until && !DATE_REGEX.test(until)) {
        throw new Error(
            "until must be in YYYY-MM-DD format"
        );
    }

    // Date order

    if (since && until) {

        const sinceDate = new Date(since);
        const untilDate = new Date(until);

        if (sinceDate > untilDate) {
            throw new Error(
                "since cannot be greater than until"
            );
        }

    }

    // metric_type required

    const hasTotalValueMetric = metrics.some(
        (metric: string) =>
            TOTAL_VALUE_METRICS.includes(metric)
    );

    if (
        hasTotalValueMetric &&
        metricType !== "total_value"
    ) {
        throw new Error(
            "metricType='total_value' is required for profile_views, accounts_engaged and total_interactions"
        );
    }

    // Lifetime metrics

    const hasLifetimeMetric = metrics.some(
        (metric: string) =>
            LIFETIME_METRICS.includes(metric)
    );

    if (
        hasLifetimeMetric &&
        period !== "lifetime"
    ) {
        throw new Error(
            "Lifetime metrics require period='lifetime'"
        );
    }

    // Don't mix lifetime metrics

    if (
        hasLifetimeMetric &&
        metrics.some(
            (metric: string) =>
                !LIFETIME_METRICS.includes(metric)
        )
    ) {
        throw new Error(
            "Lifetime metrics cannot be combined with non-lifetime metrics"
        );
    }

    // Don't mix total_value metrics

    if (
        hasTotalValueMetric &&
        metrics.some(
            (metric: string) =>
                !TOTAL_VALUE_METRICS.includes(metric)
        )
    ) {
        throw new Error(
            "total_value metrics cannot be combined with other metrics"
        );
    }

    // since/until allowed only for day period

    if ((since || until) && period !== "day") {
        throw new Error(
            "since/until can only be used with period='day'"
        );
    }

};