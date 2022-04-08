import type { NextPage } from 'next'
import { Context } from 'next-redux-wrapper';
import { END } from 'redux-saga';
import Link from 'next/link';

import styles from '../styles/Home.module.css'

import { wrapper } from '../store'
import { usersFetchRequest } from '../store/reducers/usersReducer/usersReducer';
import { useAppSelector } from '../hooks/reduxHooks';


const Home: NextPage = () => {
  const { users, error } = useAppSelector((state) => state.users);

  return (
    <div className={styles.container}>
      {
        <>
          <h1>Users</h1>
          <Link href="/other">{`Navigate to other page ->`}</Link>
          {
            error
              ?
              <h2>Error: {error}</h2>
              :
              <>
                {
                  users.length
                    ?
                    <ul>
                      {users.map(({ id, name }) => (
                        <li key={id}>{id}. {name}</li>
                      ))}
                    </ul>
                    :
                    <h2>List is empty</h2>
                }
              </>
          }
        </>
      }
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx: Context) => {
  store.dispatch(usersFetchRequest());
  store.dispatch(END);

  await store.sagaTask?.toPromise();

  return { props: {} };
});


export default Home
