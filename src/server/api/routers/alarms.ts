//  router for querying the table data
// import { type Payment } from '@/components/payments/columns';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from 'zod';

const NewAlarmSchema = z.object({
  pvName: z.string(),
  alarmType: z.string(),
  alarmValue: z.string(),
  notificationType: z.string(),
});

export type NewAlarm = z.infer<typeof NewAlarmSchema>;

export const alarmDbRouter = createTRPCRouter({
  // reads from the database SelectedPvAlarms table and parses it as Payment[]
  getUserAlarms: protectedProcedure.query(async ({ ctx }) => {
    const uid = ctx.session.user.id ?? '';
    if (uid === '') {
      throw new Error('User not found');
    }

    const userAlarms = await ctx.prisma.pvAlarm.findMany({
      where: {
        userId: uid,
      },
    });
    return userAlarms;
  }),
  createUserAlarm: protectedProcedure
    .input(NewAlarmSchema)
    .mutation(async ({ input, ctx }) => {
      const uid = ctx.session.user.id ?? '';
      if (uid === '') {
        throw new Error('User not found');
      }

      const userAlarm = await ctx.prisma.pvAlarm.create({
        data: {
          pvName: input.pvName,
          alarmType: input.alarmType,
          alarmValue: input.alarmValue,
          notificationType: input.notificationType,
          userId: uid,
        },
      });
      return userAlarm;
    }),
});
