import { cardsRouter } from "@/server/api/routers/cards";
import { createTRPCRouter } from "@/server/api/trpc";
import { dashboardsRouter } from "./routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cards: cardsRouter,
  dashboards: dashboardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
