import axios from 'axios';

import { IUser } from '../interfaces/IUser';


export async function getUsers() {
  const { data } = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');

  return data;
}
