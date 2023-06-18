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
        create: { id: input.id },
      });
      return result;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(255),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.dashboard.update({
        where: { id: input.id },
        data: { name: input.name, description: input.description },
      });
      return result;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.dashboard.delete({
        where: { id: input.id },
      });
      return result;
    }),
  createDashboard: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dashboard = { id: input.id };

      const result = await ctx.prisma.dashboard.create({ data: dashboard });
      return result;
    }),
});
