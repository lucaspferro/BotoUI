'use client';

import { type NewAlarm } from '@/server/api/routers/alarms';
import { type ColumnDef } from '@tanstack/react-table';
import { Check, X } from 'lucide-react';

import { Button } from '../ui/button';

export type TableData = NewAlarm & {
  id: string;
  caGetValue: number;
};

type Actions = {
  subscribeAlarm: (id: string) => void;
  removeFromView: (id: string) => void;
};

export const generateColumns = (actions: Actions): ColumnDef<TableData>[] => [
  {
    id: 'pvName',
    accessorKey: 'pvName',
    header: 'PV Name',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'caGetValue',
    accessorKey: 'caGetValue',
    header: 'Value',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'alarmType',
    accessorKey: 'alarmType',
    header: 'Alarm Type',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'alarmValue',
    accessorKey: 'alarmValue',
    header: 'Alarm Value',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'notificationType',
    accessorKey: 'notificationType',
    header: 'Notification Type',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'subscribeAlarm',
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => actions.subscribeAlarm(row.original.id)}
      >
        <span className="sr-only">Remove from view</span>
        <Check className="h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'removeFromView',
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => actions.removeFromView(row.original.id)}
      >
        <span className="sr-only">Remove from view</span>
        <X className="h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    enableHiding: false,
  },
];
