const logger = store => next => (action) => {
    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
        console.log(action);
    }
    return next(action);
};

export default logger;
