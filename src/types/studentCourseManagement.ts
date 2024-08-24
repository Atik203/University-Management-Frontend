import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.types";
import {
  TCourse,
  TOfferedCourse,
  TSemesterRegistration,
} from "./courseManagement.types";
import { TFaculty, TStudent } from "./userManagement.types";

export interface TEnrolledCourse {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  offeredCourse: TOfferedCourse;
  course: TCourse;
  student: TStudent;
  faculty: TFaculty;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
}

export interface TCourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}
