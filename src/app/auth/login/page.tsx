import { redirect } from 'next/navigation';

// Login now lives on the landing console (JACK IN tab).
const Login = (): never => {
  redirect('/');
};

export default Login;
