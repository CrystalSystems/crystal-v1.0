module.exports = {
  apps: [{
    name: "server",
    script: "./src/server.js",
    node_args: '--env-file=./env/.env.prod --env-file=./env/.env',
  }]
}
