import { TQueryParam, TResponseRedux } from "../../../types";
import {
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Academic Semester
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach(({ name, value }: TQueryParam) => {
            params.append(name, value as string);
          });
        }
        return {
          url: "/semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["AcademicSemester"],
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicSemester"],
    }),
    //! Academic Faculty
    getAllAcademicFaculties: builder.query({
      query: () => ({
        url: "/faculty",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["AcademicFaculty"],
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/faculty/create-academic-faculty/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
} = academicManagementApi;
