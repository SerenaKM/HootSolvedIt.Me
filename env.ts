// ensure required environmental variables are present before app startup
import { env as loadEnv } from "custom-env";
import { z } from "zod"; // to provide runtime type-checking and schema validation

process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isProduction = process.env.APP_STAGE === "production";
const isDevelopment = process.env.APP_STAGE === "dev";
const isTesting = process.env.APP_STAGE === "test";

if (isDevelopment) {
  loadEnv();
} else if (isTesting) {
  loadEnv("test");
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  APP_STAGE: z.enum(["dev", "test", "production"]).default("dev"),

  PORT: z.coerce.number().positive().default(3000), // express expects a number for a port

  DATABASE_URL: z.string().startsWith("postgresql://"), // protocol prefix that indicates a PostgreSQL database URL
});

export type Env = z.infer<typeof envSchema>; // type checking with zod at runtime
let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log("Invalid env var");
    console.error(JSON.stringify(z.treeifyError(e), null, 2));

    e.issues.forEach((err) => {
      const path = err.path.join(".");
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1); // stop the server
  }
  throw e;
}

export const isProd = () => env.APP_STAGE === "production";
export const isDev = () => env.APP_STAGE === "dev";
export const isTest = () => env.APP_STAGE === "test";
export { env };
export default env;
