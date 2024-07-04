import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateCourse from "../pages/admin/CreateCourse";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
    ],
  },
];

interface RouteItem {
  path: string;
  element: ReactNode;
}

export const adminRoutes: RouteItem[] = adminPaths.reduce(
  (acc: RouteItem[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }
    return acc;
  },
  []
);
