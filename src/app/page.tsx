import React from 'react';
import Head from 'next/head';
import HelloWorld from "@/app/ui/atoms/HelloWorld";

export default function Home() {
  return (
      <>
          <Head>
              <title>NASC Template</title>
              <meta name="description" content="A Next Atomic Styled Components template." />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <main>
              <HelloWorld />
          </main>
      </>
  );
}
