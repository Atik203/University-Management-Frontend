import * as z from "zod";

export const academicSemesterSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1),
  startMonth: z
    .string({
      required_error: "Start month is required",
    })
    .min(1),
  endMonth: z
    .string({
      required_error: "End month is required",
    })
    .min(1),
  year: z
    .string({
      required_error: "Year is required",
    })
    .min(4),
});
