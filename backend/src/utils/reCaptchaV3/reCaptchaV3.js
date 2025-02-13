import { createRequire } from "module";
const require = createRequire(import.meta.url);
const request = require('request');
// Secret key
const secretKey = process.env.RECAPTCHA_V3_SECRET_KEY;
// /SecretKey
export function reCaptchaV3 (req, res, next) {
  if (req.body.recaptchaV3Token === undefined || req.body.recaptchaV3Token === '' || req.body.recaptchaV3Token === null) {
    console.log(recaptchaV3Token)
    const UserIpAddress = req.ip;
    const name = req.body.name;
    const recaptchaV3Token = req.body.recaptchaV3Token;
    res.send({ success: false, msg: 'Recaptcha v3 token, not found', UserIpAddress: UserIpAddress, name: name, recaptchaV3Token: recaptchaV3Token });
    return null;
  }
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.recaptchaV3Token}`;
  request(verifyUrl, (err, response, body) => {
    if (err) { console.log(err); }
    body = JSON.parse(body);
    if (!body.success && body.success === undefined) {
      return res.status(403).json({ "success": false, "msg": "Failed reCAPTCHA v3 verification" });
    }
    else if (body.score < 0.5) {
      return res.status(403).json({ "success": false, "msg": "Registration error, possibly a bot detected", "score": body.score });
    }
    next();
  })
}