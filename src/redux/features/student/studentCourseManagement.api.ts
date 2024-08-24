import { TOfferedCourse, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["OfferedCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enrolledCourse: builder.mutation({
      query: (body) => ({
        url: `/enrolled-courses/create-enrolled-course`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["EnrolledCourse", "OfferedCourse"],
    }),
    getMyEnrolledCourses: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["EnrolledCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetMyOfferedCoursesQuery,
  useEnrolledCourseMutation,
  useGetMyEnrolledCoursesQuery,
} = studentCourseManagementApi;
