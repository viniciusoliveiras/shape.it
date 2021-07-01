/* eslint-disable no-use-before-define */
import React from 'react';

import Head from 'next/head';
import Image from 'next/image';

import googleLogoImg from '../../public/images/google-logo.svg';
import logoImg from '../../public/images/logo.svg';
import weightliftingImg from '../../public/images/weightlifting.png';
import { LoginButton } from '../components/LoginButton';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.content}>
          <Image src={logoImg} alt="shape.it logo" />

          <h1>Salve e gerencie seus treinos com facilidade.</h1>

          <LoginButton type="button">
            <Image src={googleLogoImg} alt="G" />
            Login com o Google
          </LoginButton>
        </section>

        <Image src={weightliftingImg} alt="Levantamento de peso" />
      </main>
    </>
  );
}
