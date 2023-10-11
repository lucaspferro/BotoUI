import { type TableData, columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { type CaGetData } from '@/server/api/routers/epics2web';
import { api } from '@/utils/api';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

export default function PvDataInterface() {
  const [pvName, setPvName] = useState<string>('');
  const [pvNames, setPvNames] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const { isSuccess, isError } = api.epicsData.caGetPvList.useQuery(pvNames, {
    refetchOnWindowFocus: false,
    enabled: pvNames.length > 0,
    // refetchInterval: 1000,
    onError: (error) => {
      console.log('onError', error);
      const newPvNames = [...pvNames].slice(0, -1);
      setPvNames(newPvNames);
    },
    onSuccess: (data) => {
      console.log('onSuccess', data);
      // fill tableData with the data from the pvData
      const newTableData = data.data.map((pv: CaGetData) => {
        return {
          pvName: pv.name,
          caGetValue: pv.value,
          alarmType: '',
          alarmValue: '',
          notificationType: '',
          subscribeAlarm: false,
          removeFromView: false,
        };
      });
      setTableData(newTableData);
    },
  });

  const handleAddPvName = () => {
    setPvNames([...pvNames, pvName]);
  };

  return (
    <div className="container mx-auto py-10 text-white ">
      <div className="flex items-center justify-center space-x-1 py-4 text-black">
        <Input
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          type="text"
          placeholder="PV Name"
          onChange={(e) => setPvName(e.target.value)}
        />
        <Button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => handleAddPvName()}
        >
          Query
        </Button>
        <Button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => setPvNames([])}
        >
          Clear
        </Button>
      </div>
      {isError && <div>Something went wrong ... pop!</div>}
      {isSuccess && <DataTable columns={columns} data={tableData} />}
    </div>
  );
}
