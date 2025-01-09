module.exports = {
  apps: [{
    name: "prodDomain",
    script: "./src/server.js",
    node_args: '--env-file=./env/.env.prodDomain --env-file=./env/.env',
  },
  {
    name: "prodIP",
    script: "./src/server.js",
    node_args: '--env-file=./env/.env.prodIP --env-file=./env/.env',
  }
  ]
}