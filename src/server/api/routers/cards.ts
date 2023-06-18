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
  getWidgets: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = ctx.prisma.widget.findMany({
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
        description: z.string().optional(),
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
  createWidget: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        dashboard: z.string().uuid(),
        desciption: z.string().optional(),
        url: z.string().url(),
        size: z.enum(["small", "medium", "large"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const widget = {
        name: input.name,
        description: input.desciption,
        url: input.url,
        size: input.size,
        dashboardId: input.dashboard,
      };

      const result = await ctx.prisma.widget.create({ data: widget });

      return result;
    }),
  createGroup: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        dashboard: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const group = {
        name: input.name,
        dashboardId: input.dashboard,
      };

      const result = await ctx.prisma.group.create({ data: group });

      return result;
    }),
});
