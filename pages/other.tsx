import { Context } from 'next-redux-wrapper';
import Link from 'next/link';

import styles from '../styles/Home.module.css'

import { wrapper } from '../store';


export default function Other(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>Other page</h1>
      <Link href="/">{`<- Go back home`}</Link>
    </div>
  );
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx: Context) => {
  return { props: {} };
});
