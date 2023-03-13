

module.exports = function (router, passport) {
    const HomeRouter = require("./HomeRouter");

    router.use('/', HomeRouter);
}