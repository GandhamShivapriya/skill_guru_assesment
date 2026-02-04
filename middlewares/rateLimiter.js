const requests = new Map();

export const createNoteRateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 60 * 1000;
    const limit = 5;

    const timestamps = requests.get(ip) || [];

    const validTimestamps = timestamps.filter(
        time => now - time < windowMs
    );

    if (validTimestamps.length >= limit) {
        return res.status(429).json({
            message: "Rate limit exceeded: Max 5 notes per minute"
        });
    }

    validTimestamps.push(now);
    requests.set(ip, validTimestamps);

    next();
};
