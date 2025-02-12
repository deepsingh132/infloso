import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import { Toaster } from './components/ui/toaster';
import { useEffect } from 'react';
import AuthService from './auth/AuthService';
import { useToast } from './hooks/use-toast';
import Authenticated from './pages/signed-in';
import NotFound from './pages/notfound';

function App() {

  const { toast } = useToast();
  const localStorageUser = AuthService.getCurrentUser();

  useEffect(() => {
    async function verifyUser() {
      try {
        const isVerified = await AuthService.validateUser();
        if (!isVerified) {
          AuthService.logout();
          toast({
            variant: "destructive",
            title: "Error",
            description: "Session expired. Please login again.",
          })
        }
      } catch (error) {
        console.error("Error: ", error);
        AuthService.logout();
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error verifying user. Please login again.",
        })
      }
    }
    if (localStorageUser) verifyUser();
  }, [localStorageUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: AuthService.getCurrentUser() ? <Authenticated /> : <LoginPage />,
    },
    {
      path: "/signup",
      element: AuthService.getCurrentUser() ? <Authenticated /> : <SignupPage />,
    },
    {
      path: "/login",
      element: AuthService.getCurrentUser() ? <Authenticated /> : <LoginPage />,
    },
    {
      path: "/authenticated",
      element: AuthService.getCurrentUser() ? <Authenticated /> : <LoginPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      </>
  )
}

export default App
