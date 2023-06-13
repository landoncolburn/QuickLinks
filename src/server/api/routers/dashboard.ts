import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const dashboardsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = ctx.prisma.dashboard.findMany();
    return result;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = ctx.prisma.dashboard.upsert({
        where: { id: input.id },
        update: {},
        create: { id: input.id, name: "test" },
      });
      return result;
    }),
  createDashboard: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dashboard = { name: input.name };

      const result = await ctx.prisma.dashboard.create({ data: dashboard });
      return result;
    }),
});
