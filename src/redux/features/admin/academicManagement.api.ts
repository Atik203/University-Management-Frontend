import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/semesters",
        method: "GET",
      }),
      providesTags: ["AcademicSemester"],
    }),

    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicSemester"],
    }),
  }),
});

export const { useGetAllSemesterQuery, useCreateAcademicSemesterMutation } =
  academicManagementApi;
