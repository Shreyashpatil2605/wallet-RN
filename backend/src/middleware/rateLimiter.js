import ratelimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many request, Please try again Later",
      });
    }
    next();
  } catch (error) {
    console.log("Rate Limit Error", error);
    return res.status(503).json({
      message: "Rate limiting service is unavailable. Please try again later.",
    });
  }
};
export default rateLimiter;
