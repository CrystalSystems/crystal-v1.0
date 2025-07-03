import {
  SERVER_PORT,
  APP_MODE,
  CORS_ORIGIN
} from "../../../shared/constants/index.js";

const redBox = (text) => `\x1b[41m\x1b[38;2;255;255;255m${text}\x1b[0m`;
const orangeBox = (text) => `\x1b[48;5;202m\x1b[38;2;255;255;255m${text}\x1b[0m`;

export async function startServer(app) {
  app.listen(SERVER_PORT, (error) =>
    error
      ? (console.error("❌ Server error -", error), process.exit(1))
      : console.log(`    🔥 Server OK

  ${redBox(`   🔥 Roast 🔥   `)}

  Port: ${SERVER_PORT}
  Mode: ${orangeBox(` ${APP_MODE} `)}

  ${orangeBox(`   CORS   `)}
  origin: ${CORS_ORIGIN}
    `
      )
  );
}