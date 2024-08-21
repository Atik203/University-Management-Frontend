import { TAcademicSemester } from "./academicManagement.types";
import { TFaculty } from "./userManagement.types";

export interface TSemesterRegistration {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface TCourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourse[];
  isDeleted: boolean;
}

export interface TPreRequisiteCourse {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
}

export interface TCourseFaculties {
  _id: string;
  course: string;
  createdAt: string;
  faculties: TFaculty[];
  updatedAt: string;
}
