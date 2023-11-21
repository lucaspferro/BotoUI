// import DemoPage from '@/components/payments/page';
import PvDataInterface from '@/components/pv-data-interface';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Boto</title>
        <meta name="description" content="PV Alarm System" />
        <link rel="icon" href="/icon.svg" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-8 ">
          <h1 className=" text-pink-600 text-2xl text-center font-medium sm:text-[5rem] ">
            Boto
          </h1>
          {/* <h1 className="text-2xl font-medium sm:text-[5rem]">
            Boto<span className="text-pink-600">PV</span>Alarm
          </h1> */}
          <p className="text-sm font-light tracking-tight flex-col items-center justify-center text-center sm:text-[1.5rem]">
            Programmable <span className="text-pink-600">PV</span> alarm
          </p>
        </div>
        {sessionData && (
          <div className="flex h-full justify-center p-2 rounded-lg shadow-lg">
            <PvDataInterface />
          </div>
        )}
        <AuthShowcase />
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const parseInitials = (email: string) => {
    const noAt = email.split('@')[0] ?? 'no email';
    const parsed = noAt
      .split('.')
      .map((n) => n[0])
      .join('');

    return parsed.toUpperCase();
  };

  return (
    <div>
      {sessionData ? (
        <Button
          variant={'outline'}
          title="sign out"
          className="rounded-lg fixed top-4 right-4"
          onClick={() => void signOut()}
        >
          {parseInitials(sessionData.user?.email ?? '')}
        </Button>
      ) : (
        <Button title="sign in" className="mt-4" onClick={() => void signIn()}>
          Sign in
        </Button>
      )}
    </div>
  );
}
