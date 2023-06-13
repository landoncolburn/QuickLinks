import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const cardsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = ctx.prisma.card.findMany({
        where: { dashboardId: input.id },
      });
      return result;
    }),
  createCard: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        iconColor: z.string().startsWith("#").max(7),
        backgroundColor: z.string().startsWith("#").max(7),
        link: z.string().url(),
        description: z.string().min(1).max(255),
        dashboard: z.string().uuid(),
        icon: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const card = {
        name: input.name,
        iconColor: input.iconColor,
        backgroundColor: input.backgroundColor,
        link: input.link,
        description: input.description,
        dashboardId: input.dashboard,
        icon: input.icon,
      };

      const result = await ctx.prisma.card.create({ data: card });

      return result;
    }),
});
