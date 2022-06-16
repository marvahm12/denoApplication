import { env } from "./deps.ts";

const config = {
  scripts: {
    // same as json configuration
    start: {
      cmd: "deno run --unstable server.ts",
      tsconfig: "tsconfig.json",
      allow: ["env", "read", "net"],
      env: env({ safe: true }),
    },
  },
};

export default config;
