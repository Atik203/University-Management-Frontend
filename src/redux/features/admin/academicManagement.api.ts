import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => ({
        url: "/semesters",
        method: "GET",
      }),
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
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
