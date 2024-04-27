import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@/components/theme/theme-provider.jsx"
import Dashboard from './routes/Dashboard.jsx';
import Teachers from './routes/Page/Teachers/Teachers.jsx';
import { Login } from './components/app_components/Login.jsx';
import DashboardContent from './routes/Page/Dashboard/DashboardContent.jsx';
import AddTeacher from './routes/Page/Teachers/AddTeacher.jsx';
import Students from './routes/Page/Students/Students.jsx';
import AddStudents from './routes/Page/Students/AddStudents.jsx';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/',
        element: <DashboardContent />
      },
      {
        path: '/dashboard/teachers',
        element: <Teachers />
      },
      {
        path: '/dashboard/add-teachers',
        element: <AddTeacher />
      },
      {
        path: '/dashboard/students',
        element: <Students />
      },
      {
        path: '/dashboard/add-students',
        element: <AddStudents />
      },
      /*       {
              path: '/dashboard',
              element: <Dashboard/>
            },
            {
              path: '/teachers',
              element: <Teachers/>
            },
            {
              path: '/customers',
              element: <Customers/>
            },
            {
              path: '/analytics',
              element: <Analytics/>
            },
            {
              path: '/admin_login',
              element: <Admin/>
            },
            {
              path: '/staff_login',
              element: <Staff/>
            } */

    ],

  },
  {
    path: "/",
    element: <Login />,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
