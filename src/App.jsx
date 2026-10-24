import Home from './pages/Home';
import About from './pages/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout';
import Login from './pages/Login';
import Signup from './pages/Signup'
import BookContainer from './components/BookContainer';

import AdminGate from './admin/AdminGate';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard'


function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/books",
          element: <BookContainer />
        },
        {
          path: "/about",
          element: <About />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: '/admin',
      element: (
        <AdminGate>
          <AdminLayout />
        </AdminGate>
      ),
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
