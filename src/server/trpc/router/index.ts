// src/server/router/index.ts
import { router } from "../trpc";

import { exampleRouter } from "./glossary";

export const appRouter = router({
  glossary: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
