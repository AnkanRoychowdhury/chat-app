import Head from 'next/head';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('./components/Chat'), {
  ssr: false,
})

export default function Page(): JSX.Element {
  return (
    <div className="container">
      <Head>
        <title>Realtime Chat App with Ankan, NextJS and Node</title>
        <link rel="icon" href="#" type="image/svg+xml" />
      </Head>
      <main>
        <h1 className="title">Let's chat...</h1>
        <Chat />
      </main>
    </div>
  );
}
