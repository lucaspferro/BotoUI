//  router for querying the table data
import { type Payment } from '@/components/payments/columns';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import fs from 'fs/promises';
import { set } from 'lodash';

export const tableDataRouter = createTRPCRouter({
  getData: publicProcedure.query(async () => {
    // reads a json file from /data/data.json parses it as Payment[]
    const rawData = await fs
      .readFile('./data/data.json', 'utf-8')
      .catch((err) => {
        console.error(err);
        return '';
      });
    // simulates a slow process in the server
    return await new Promise<Payment[]>((resolve) => {
      setTimeout(() => resolve(JSON.parse(rawData) as Payment[]), 3000);
    });
  }),
});
