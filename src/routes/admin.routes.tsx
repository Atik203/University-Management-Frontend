import AcademicDepartment from "../pages/admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/AcademicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/AcademicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/AcademicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/AcademicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/AcademicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/CourseManagement/Courses";
import CreateCourse from "../pages/admin/CourseManagement/CreateCourse";
import CreateSemesterRegistration from "../pages/admin/CourseManagement/CreateSemesterRegistration";
import RegisteredSemester from "../pages/admin/CourseManagement/RegisteredSemester";
import AdminData from "../pages/admin/UserManagement/admin/AdminData";
import AdminDetails from "../pages/admin/UserManagement/admin/AdminDetails";
import CreateAdmin from "../pages/admin/UserManagement/admin/CreateAdmin";
import UpdateAdmin from "../pages/admin/UserManagement/admin/UpdateAdmin";
import CreateFaculty from "../pages/admin/UserManagement/faculty/CreateFaculty";
import FacultyData from "../pages/admin/UserManagement/faculty/FacultyData";
import FacultyDetails from "../pages/admin/UserManagement/faculty/FacultyDetails";
import UpdateFaculty from "../pages/admin/UserManagement/faculty/UpdateFaculty";
import CreateStudent from "../pages/admin/UserManagement/student/CreateStudent";
import StudentData from "../pages/admin/UserManagement/student/StudentData";
import StudentDetails from "../pages/admin/UserManagement/student/StudentDetails";
import UpdateStudent from "../pages/admin/UserManagement/student/UpdateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
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
        name: "Students",
        path: "student-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:id",
        element: <StudentDetails />,
      },
      {
        path: "student-data/update/:id",
        element: <UpdateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "faculty-data",
        element: <FacultyData />,
      },
      {
        path: "faculty-data/update/:id",
        element: <UpdateFaculty />,
      },
      {
        path: "faculty-data/:id",
        element: <FacultyDetails />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admin-data",
        element: <AdminData />,
      },
      {
        path: "admin-data/:id",
        element: <AdminDetails />,
      },
      {
        path: "admin-data/update/:id",
        element: <UpdateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Semester Reg.",
        path: "create-semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "Reg. Semesters",
        path: "registered-semesters",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
    ],
  },
];
