export const logger = (store) => (next) => (action) => {
    if (process.env.ENVIRONMENT !== "production") {
        console.log(action);
    }
    return next(action);
};
