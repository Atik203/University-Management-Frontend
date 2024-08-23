import { TQueryParam } from "../../../types";
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
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetMyOfferedCoursesQuery } = studentCourseManagementApi;
