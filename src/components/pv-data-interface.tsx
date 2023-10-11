import { type CaGetData } from '@/server/api/routers/epics2web';
import { api } from '@/utils/api';
// import { columns } from './columns';
// import { DataTable } from './data-table';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

export default function PvDataInterface() {
  const [pvName, setPvName] = useState<string>('');
  const [pvNames, setPvNames] = useState<string[]>([]);
  const {
    data: pvData,
    isSuccess,
    isError,
    isLoading,
  } = api.epicsData.caGetPvList.useQuery(pvNames, {
    refetchOnWindowFocus: false,
    enabled: pvNames.length > 0,
    // refetchInterval: 1000,
    onError: (error) => {
      console.log('onError', error);
      const newPvNames = [...pvNames].slice(0, -1);
      setPvNames(newPvNames);
    },
  });

  const handleAddPvName = () => {
    setPvNames([...pvNames, pvName]);
  };

  return (
    <div className="container mx-auto py-10 text-white ">
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
      {isError && <div>Something went wrong ... pop!</div>}
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div>
          {pvData.data.map((pv: CaGetData) => (
            <div key={pv.name}>
              <div>
                name: {pv.name},value: {pv.value}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {fileDataIsSuccess && <DataTable columns={columns} data={theData} />}  */}
    </div>
  );
}
