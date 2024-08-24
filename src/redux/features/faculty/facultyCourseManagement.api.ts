import { TEnrolledCourse, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultyEnrolledCourses: builder.query({
      query: () => ({
        url: `/enrolled-courses`,
        method: "GET",
      }),
      providesTags: ["EnrolledCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateMarks: builder.mutation({
      query: (data) => {
        return {
          url: `/enrolled-courses/update-enrolled-course-marks`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["EnrolledCourse"],
    }),
  }),
});

export const { useGetFacultyEnrolledCoursesQuery, useUpdateMarksMutation } =
  facultyCourseManagementApi;
