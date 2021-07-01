import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/images/logo.svg';
import weightliftingImg from '../../public/images/weightlifting.png';
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

          <button type="button">Login com o Google</button>
        </section>

        <Image src={weightliftingImg} alt="Levantamento de peso" />
      </main>
    </>
  );
}
