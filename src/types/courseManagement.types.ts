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

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferedCourse = {
  semesterRegistration: string;
  academicSemester?: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};
