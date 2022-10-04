import {myAxios} from './HTTPS';

export const signUp = () => {
  return myAxios
    .post('/wheelsale-app-ws/dealers/register')
    .then(response => response.data);
};
