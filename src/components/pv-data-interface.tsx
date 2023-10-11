import { type TableData, generateColumns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const formSchema = z.object({
  id: z.string(),
  pvname: z.string().min(2, {
    message: 'pvname must be at least 2 characters.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function PvDataInterface() {
  const [pvNames, setPvNames] = useState<FormSchema[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const {} = api.epicsData.caGetPvList.useQuery(pvNames, {
    refetchOnWindowFocus: false,
    // enabled: pvNames.length > 0,
    // refetchInterval: 1000,
    onError: (error) => {
      console.log('onError', error);
      const newPvNames = [...pvNames].slice(0, -1);
      setPvNames(newPvNames);
    },
    onSuccess: (data) => {
      console.log('onSuccess', data);
      // fill tableData with the data from the pvData
      const newTableData = data.map((pv) => {
        return {
          id: pv.id,
          pvName: pv.name,
          caGetValue: pv.value,
          alarmType: '',
          alarmValue: '',
          notificationType: '',
        };
      });
      setTableData(newTableData);
    },
  });

  const subscribeAlarm = (id: string) => {
    console.log('subscribeAlarm', id);
  };
  const removeFromView = (id: string) => {
    const newPvNames = pvNames.filter((pv) => pv.id !== id);
    setPvNames(newPvNames);
  };

  const columns = generateColumns({ subscribeAlarm, removeFromView });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: nanoid(),
      pvname: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setPvNames([...pvNames, data]);
    form.reset({ id: nanoid(), pvname: '' });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => <Input type="hidden" {...field} />}
          />
          <FormField
            control={form.control}
            name="pvname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pv</FormLabel>
                <FormControl>
                  <Input placeholder="minha pv caralho" {...field} />
                </FormControl>
                <FormDescription>Enter the pv name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">QUERY</Button>
        </form>
      </Form>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
