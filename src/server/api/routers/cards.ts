import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { Card } from "@/types/Card";
import { z } from "zod";

const DEMO_CARDS = [
  {
    name: "Dashboard",
    color: "#FFBE0B",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["dashboard"],
  },
  {
    name: "Projects",
    color: "#FB5607",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["projects"],
  },
  {
    name: "Calendar",
    color: "#FF006E",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["calendar"],
  },
  {
    name: "Documents",
    color: "#8338EC",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["documents"],
  },
  {
    name: "Reports",
    color: "#3A86FF",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["reports"],
  },
  {
    name: "Settings",
    color: "#441199",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["settings"],
  },
  {
    name: "Help",
    color: "#FF006E",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["help"],
  },
  {
    name: "Support",
    color: "#FFBE0B",
    link: "https://google.com",
    description: "A quick example card.",
    tags: ["support"],
  },
];

export const cardsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = ctx.prisma.card.findMany();

    return result;
  }),
  createCard: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        color: z.string().startsWith("#").max(7),
        link: z.string().url(),
        description: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const card: Card = {
        name: input.name,
        color: input.color,
        link: input.link,
        description: input.description,
      };

      const result = await ctx.prisma.card.create({ data: card });

      return result;
    }),
});
