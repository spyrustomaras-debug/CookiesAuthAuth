// src/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://<YOUR_DSN>.ingest.sentry.io/<PROJECT_ID>",
  integrations: [
    Sentry.browserTracingIntegration(), // 👈 updated way
  ],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});
