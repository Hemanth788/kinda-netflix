import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Woohoo! Kind of a Netflix clone. LOL!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Whaaat!</h1>
    </div>
  );
}
