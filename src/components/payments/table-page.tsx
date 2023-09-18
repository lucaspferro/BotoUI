import { api } from '@/utils/api';

import { columns } from './columns';
import { DataTable } from './data-table';

export default function DemoTablePage() {
  console.log('hey i am the DemoPage being rendered!');
  // getting the data from the backend
  const {
    data: theData,
    isLoading,
    isSuccess,
  } = api.myTableData.getData.useQuery(undefined, {
    onSuccess: () => {
      console.log('hey i am the onSuccess function being called!');
    },
  });

  return (
    <div className="container mx-auto py-10 text-white ">
      {isLoading && <div>Loading...</div>}
      {isSuccess && <DataTable columns={columns} data={theData} />}
    </div>
  );
}
