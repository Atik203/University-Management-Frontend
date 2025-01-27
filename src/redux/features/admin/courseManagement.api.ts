import {
  TCourse,
  TCourseFaculties,
  TOfferedCourse,
  TResponseRedux,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Course
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
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
      providesTags: ["Course"],
      transformResponse: (response: TResponseRedux<TCourseFaculties>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    //! Offered Course

    getAllOfferedCourses: builder.query({
      query: () => ({
        url: "/offered-courses",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["OfferedCourse"],
    }),

    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OfferedCourse"],
    }),

    getMyOfferedCourses: builder.query({
      query: () => ({
        url: "/offered-courses/my-offered-courses",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["OfferedCourse"],
    }),

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
    updateSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: `/semester-registration/${data.id}`,
        method: "PATCH",
        body: data.body,
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
  useUpdateSemesterRegistrationMutation,
  useGetAllOfferedCoursesQuery,
  useCreateOfferedCourseMutation,
  useGetMyOfferedCoursesQuery,
} = courseManagementApi;
