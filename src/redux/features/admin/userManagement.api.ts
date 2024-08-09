import {
  TAdmin,
  TFaculty,
  TQueryParam,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Student
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
        }

        return {
          url: `/students`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Student"],
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: `/users/create-student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    getSingleStudent: builder.query({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    updateStudent: builder.mutation({
      query: (body) => ({
        url: `/students/${body.id}`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["Student"],
    }),

    //! Faculty
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return { url: `/faculties`, method: "GET", params };
      },

      providesTags: ["Faculty"],
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (id: string) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
      providesTags: ["Faculty"],
    }),
    createFaculty: builder.mutation({
      query: (body) => ({
        url: `/users/create-faculty`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faculty"],
    }),
    updateFaculty: builder.mutation({
      query: (body) => ({
        url: `/faculties/${body.id}`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["Faculty"],
    }),

    //! Admin
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return { url: `/admin`, method: "GET", params };
      },
      providesTags: ["Admin"],
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (id: string) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: `/users/create-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation({
      query: (body) => ({
        url: `/admin/${body.id}`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["Admin"],
    }),

    //! User

    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
    changeStatus: builder.mutation({
      query: (body) => ({
        url: `/users/change-status/${body.id}`,
        method: "POST",
        body: {
          status: body.status,
        },
      }),
      invalidatesTags: ["Student", "Admin", "Faculty"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useDeleteStudentMutation,
  useGetAllFacultiesQuery,
  useGetSingleFacultyQuery,
  useCreateFacultyMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useCreateAdminMutation,
  useGetMeQuery,
  useChangeStatusMutation,
  useUpdateStudentMutation,
  useUpdateFacultyMutation,
  useUpdateAdminMutation,
} = userManagementApi;
