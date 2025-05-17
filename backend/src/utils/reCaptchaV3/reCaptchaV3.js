import fetch from 'node-fetch';

// Secret key
const SECRET_KEY = process.env.RECAPTCHA_V3_SECRET_KEY;
// /Secret Key

export async function reCaptchaV3(req, res, next) {
  const recaptchaV3Token = req.body.recaptchaV3Token;

  if (!recaptchaV3Token) {
    const UserIpAddress = req.ip;
    const name = req.body.name;
    res.send({
      success: false,
      msg: 'Recaptcha v3 token, not found',
      UserIpAddress,
      name,
      recaptchaV3Token
    });
    return;
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaV3Token}`;

  try {
    const response = await fetch(verifyUrl, { method: 'POST' });
    const body = await response.json();

    if (!body.success || body.success === undefined) {
      return res.status(403).json({ success: false, msg: "Failed reCAPTCHA v3 verification" });
    } else if (body.score < 0.5) {
      return res.status(403).json({
        success: false,
        msg: "Registration error, possibly a bot detected",
        score: body.score
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error during reCAPTCHA verification" });
  }
}
