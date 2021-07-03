/* eslint-disable no-use-before-define */
import Head from 'next/head';
import React from 'react';

import { Header } from '../components/Header';

export default function Workouts() {
  return (
    <>
      <Head>
        <title>shape.it | treinos</title>
      </Head>

      <Header />
    </>
  );
}
