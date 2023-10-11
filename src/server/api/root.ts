import { epics2webDataRouter } from '@/server/api/routers/epics2web';
import { createTRPCRouter } from '@/server/api/trpc';

import { alarmDbRouter } from './routers/alarms';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  epicsData: epics2webDataRouter,
  alarms: alarmDbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
