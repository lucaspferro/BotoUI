//  router for querying the table data
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const CaGetDataSchema = z.object({
  name: z.string(),
  value: z.number(),
});

const CaGetSchema = z.object({
  data: z.array(CaGetDataSchema),
});

export type CaGetResponse = z.infer<typeof CaGetSchema>;
export type CaGetData = z.infer<typeof CaGetDataSchema>;

export const epics2webDataRouter = createTRPCRouter({
  caGetPvList: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const pvList = input;
      const params = new URLSearchParams(pvList.map((s) => ['pv', s]));
      const response = await fetch(
        `http://ais-eng-srv-la.cnpem.br/epics2web/caget?${params.toString()}`,
      );
      const data: unknown = await response.json();
      const result = CaGetSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error parsing response from CA',
        });
      }
      return result.data;
    }),
});
