module.exports = {
  apps: [{
    name: "prodDomain",
    env: {
      NODE_ENV: "production",
    },
    script: "./src/core/main.js",
    node_args: '--env-file=./env/.env.prodDomain --env-file=./env/.env',
  },
  {
    name: "prodIP",
    env: {
      NODE_ENV: "production",
    },
    script: "./src/core/main.js",
    node_args: '--env-file=./env/.env.prodIP --env-file=./env/.env',
  }
  ]
}