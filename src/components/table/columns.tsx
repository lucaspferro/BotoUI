'use client';

import { type NewAlarm } from '@/server/api/routers/alarms';
import { type ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TableData = NewAlarm & {
  caGetValue: number;
  subscribeAlarm: boolean;
  removeFromView: boolean;
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'pvName',
    header: 'PV Name',
  },
  {
    accessorKey: 'caGetValue',
    header: 'Value',
  },
  {
    accessorKey: 'alarmType',
    header: 'Alarm Type',
  },
  {
    accessorKey: 'alarmValue',
    header: 'Alarm Value',
  },
  {
    accessorKey: 'notificationType',
    header: 'Notification Type',
  },
  {
    accessorKey: 'subscribeAlarm',
    header: 'Subscribe Alarm',
  },
  {
    accessorKey: 'removeFromView',
    header: 'Remove From View',
  },
];

// export type Payment = {
//   id: string;
//   amount: number;
//   status: 'connected' | 'name' | 'severity' | 'status' | 'value';
//   email: string;
// };

// export const columns: ColumnDef<TableData>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },

//   {
//     accessorKey: 'name',
//     header: ({ column }) => {
//       return (
//         <Button
//           className="text-black  "
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           PV-Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'value',
//     header: ({ column }) => {
//       return (
//         <Button
//           className="text-black  "
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Value
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'connected',
//     header: ({ column }) => {
//       return (
//         <Button
//           className="text-black  "
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Connected
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'severity',
//     header: ({ column }) => {
//       return (
//         <Button
//           className="text-black  "
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Severity
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'status',
//     header: ({ column }) => {
//       return (
//         <Button
//           className="text-black  "
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Status
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => {
//                 void navigator.clipboard.writeText(payment.id)
//                 return;
//               }}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
