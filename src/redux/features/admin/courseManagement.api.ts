import { TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Course
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    assignFaculties: builder.mutation({
      query: (data) => ({
        url: `/courses/${data.id}/assign-faculties`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    removeFaculties: builder.mutation({
      query: (data) => ({
        url: `/courses/${data.id}/remove-faculties`,
        method: "DELETE",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => ({
        url: `/courses/${id}/get-faculties`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    //! Offered Course

    //! Semester Registration
    getAllSemesterRegistrations: builder.query({
      query: () => ({
        url: "/semester-registration",
        method: "GET",
      }),
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["SemesterRegistration"],
    }),
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAssignFacultiesMutation,
  useRemoveFacultiesMutation,
  useGetCourseFacultiesQuery,
  useGetAllSemesterRegistrationsQuery,
  useCreateSemesterRegistrationMutation,
} = courseManagementApi;
