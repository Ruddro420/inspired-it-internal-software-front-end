import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@/components/theme/theme-provider.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Teachers from "./routes/Page/Teachers/Teachers.jsx";
import { Login } from "./components/app_components/Login.jsx";
import DashboardContent from "./routes/Page/Dashboard/DashboardContent.jsx";
import AddTeacher from "./routes/Page/Teachers/AddTeacher.jsx";
import Students from "./routes/Page/Students/Students.jsx";
import AddStudents from "./routes/Page/Students/AddStudents.jsx";
import Staffs from "./routes/Page/Staffs/Staffs";
import AddStuffs from "./routes/Page/Staffs/AddStuffs";
import Subjects from "./routes/Page/Subjects/Subjects";
import AddSubjects from "./routes/Page/Subjects/AddSubjects";
import Classes from "./routes/Page/Classes/Classes";
import AddClasses from "./routes/Page/Classes/AddClasses";
import Notices from "./routes/Page/Notices/Notices";
import AddNotices from "./routes/Page/Notices/AddNotices";
import Fees from "./routes/Page/Fees/Fees";
import AddFees from "./routes/Page/Fees/AddFees";
import Sections from "./routes/Page/Sections/Sections";
import Results from "./routes/Page/Result/Results";
import AddResults from "./routes/Page/Result/AddResults";
import IdCards from "./routes/Page/IdCard/IdCards";
import Salaries from "./routes/Page/Salary/SalaryReport";
import AddSalaries from "./routes/Page/Salary/PaySalary";
import Reports from "./routes/Page/Report/Reports";
import AddReports from "./routes/Page/Report/AddReports";
import Exams from "./routes/Page/Exam/Exams";
import AddExams from "./routes/Page/Exam/AddExams";
import AddSections from "./routes/Page/Sections/AddSections";
import AddAccounts from "./routes/Page/Accounts/AddAccounts";
import ViewAccountReport from "./routes/Page/Accounts/ViewAccountReport";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./Providers/AuthProvider";
import ClassView from "./routes/Page/Classes/ClassView";
import { Toaster } from "react-hot-toast";
import Settings from "./routes/Page/Settings/Settings";
import StudentProfile from "./routes/Page/Profile/StudentProfile";
import PaySalary from "./routes/Page/Salary/PaySalary";
import SalaryReport from "./routes/Page/Salary/SalaryReport";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "/dashboard/",
        element: <DashboardContent />,
      },
      {
        path: "/dashboard/teachers",
        element: <Teachers />,
      },
      {
        path: "/dashboard/add-teachers",
        element: <AddTeacher />,
      },
      {
        path: "/dashboard/students",
        element: <Students />,
      },
      {
        path: "/dashboard/add-students",
        element: <AddStudents />,
      },
      {
        path: "/dashboard/stuffs",
        element: <Staffs />,
      },
      {
        path: "/dashboard/add-staffs",
        element: <AddStuffs />,
      },
      {
        path: "/dashboard/subjects",
        element: <Subjects />,
      },
      {
        path: "/dashboard/add-subjects",
        element: <AddSubjects />,
      },
      {
        path: "/dashboard/classes",
        element: <Classes />,
      },
      {
        path: "/dashboard/add-classes",
        element: <AddClasses />,
      },
      {
        path: "/dashboard/class-view/:id",
        element: <ClassView />,
      },
      {
        path: "/dashboard/notices",
        element: <Notices />,
      },
      {
        path: "/dashboard/add-notices",
        element: <AddNotices />,
      },
      {
        path: "/dashboard/fees",
        element: <Fees />,
      },
      {
        path: "/dashboard/add-fees",
        element: <AddFees />,
      },
      {
        path: "/dashboard/sections",
        element: <Sections />,
      },
      {
        path: "/dashboard/add-fees",
        element: <AddFees />,
      },
      {
        path: "/dashboard/sections",
        element: <Sections />,
      },
      {
        path: "/dashboard/add-sections",
        element: <AddSections />,
      },
      {
        path: "/dashboard/add-fees",
        element: <AddFees />,
      },
      {
        path: "/dashboard/results",
        element: <Results />,
      },
      {
        path: "/dashboard/add-results",
        element: <AddResults />,
      },
      {
        path: "/dashboard/id-cards",
        element: <IdCards />,
      },
      {
        path: "/dashboard/salaries-report",
        element: <SalaryReport />,
      },
      {
        path: "/dashboard/pay-salaries",
        element: <PaySalary />,
      },
      {
        path: "/dashboard/reports",
        element: <Reports />,
      },
      {
        path: "/dashboard/add-reports",
        element: <AddReports />,
      },
      {
        path: "/dashboard/exams",
        element: <Exams />,
      },
      {
        path: "/dashboard/add-exams",
        element: <AddExams />,
      },
      {
        path: "/dashboard/add-accounts",
        element: <AddAccounts />,
      },
      {
        path: "/dashboard/view-accounts-report",
        element: <ViewAccountReport />,
      },
      {
        path: "/dashboard/admin-settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/student-profile/:id",
        element: <StudentProfile />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
     <AuthProvider> 
      <RouterProvider router={router} />
      <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
