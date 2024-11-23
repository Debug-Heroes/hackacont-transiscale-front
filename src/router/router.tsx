import { Home } from '@/page/home';
import { Login } from '@/page/login'
import { SignUp } from '@/page/signup';
import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signin',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  }
])
