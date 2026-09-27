const rateLimiter = require('express-rate-limit');


const loginLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many attempts! Please try again after 20 minutes."},
    standardHeaders: true,
    legacyHeaders: false,
});

const changePasswordLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many password change attempts! Please try again later"},
    standardHeaders: true,
    legacyHeaders: false,
});

const feedbackLimiter = rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {message: "Too many Feed Back attempts! Please try again later."},
    standardHeaders: true,
    legacyHeaders: false,
});

const otherLimiters = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: {message: "Too many attempts!!! Please try again later"},
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    loginLimiter,
    changePasswordLimiter,
    feedbackLimiter,
    otherLimiters,
};