import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.glossary.findMany();
  }),
  addOne: publicProcedure
    .input(
      z.object({
        term: z.string(),
        definition: z.string(),
        resourceURL: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log("INPUT", input);
      return ctx.prisma.glossary.create({ data: input });
    }),
  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.glossary.delete({ where: { id } });
    }),
  updateOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
        term: z.string(),
        definition: z.string(),
        resourceURL: z.string(),
      })
    )
    .mutation(({ ctx, input: { id, ...data } }) => {
      return ctx.prisma.glossary.update({ where: { id }, data });
    }),
});
