// import DemoPage from '@/components/payments/page';
import DemoTablePage from '@/components/payments/table-page';
import { api } from '@/utils/api';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Boto</title>
        <meta name="description" content="PV Alarm System" />
        <link rel="icon" href="/icon.svg" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#9370DB] to-[#15162c]">
        <div className="flex justify-between justify-center  px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Boto<span className="text-[#2e026d]">PV</span>Alarm
            <p className="text-sm font-extrabold tracking-tight flex-col items-center justify-centerr text-white sm:text-[1.5rem]">
              Programmable<span className="text-[#2e026d]">PV</span> alarm
            </p>
          </h1>
        </div>

        <div className="flex min-h-screen  justify-center  ">
          <div className=" grid justify-items-star gap-2 ">
            <DemoTablePage />
          </div>

          <div className="grid justify-items-end gap-2">
            <DemoTablePage />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
          </p>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
}
