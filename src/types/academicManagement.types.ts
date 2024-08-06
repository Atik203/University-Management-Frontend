export interface TAcademicSemester {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
}

export interface TAcademicFaculty {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TAcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
}
