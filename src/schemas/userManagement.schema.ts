import { z } from "zod";

const userNameSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" }),
  middleName: z.string({ required_error: "Middle name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
});

const guardianSchema = z.object({
  fatherName: z.string({ required_error: "Father name is required" }),
  fatherOccupation: z.string({
    required_error: "Father occupation is required",
  }),
  fatherContactNo: z.string({
    required_error: "Father contact number is required",
  }),
  motherName: z.string({ required_error: "Mother name is required" }),
  motherOccupation: z.string({
    required_error: "Mother occupation is required",
  }),
  motherContactNo: z.string({
    required_error: "Mother contact number is required",
  }),
});

const localGuardianSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  occupation: z.string({ required_error: "Occupation is required" }),
  contactNo: z.string({ required_error: "Contact number is required" }),
  address: z.string({ required_error: "Address is required" }),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(4, "Password must be at least 6 characters")
      .optional(),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string({ required_error: "Email is required" }).email(),
      contactNo: z.string({ required_error: "Contact number is required" }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact number is required",
      }),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string({
        required_error: "Present address is required",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
      }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      admissionSemester: z.string({
        required_error: "Admission semester is required",
      }),
      academicDepartment: z.string({
        required_error: "Academic department is required",
      }),
    }),
  }),
});

const updateUserNameSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).optional(),
  middleName: z
    .string({ required_error: "Middle name is required" })
    .optional(),
  lastName: z.string({ required_error: "Last name is required" }).optional(),
});

const updateGuardianSchema = z.object({
  fatherName: z
    .string({ required_error: "Father name is required" })
    .optional(),
  fatherOccupation: z
    .string({ required_error: "Father occupation is required" })
    .optional(),
  fatherContactNo: z
    .string({ required_error: "Father contact number is required" })
    .optional(),
  motherName: z
    .string({ required_error: "Mother name is required" })
    .optional(),
  motherOccupation: z
    .string({ required_error: "Mother occupation is required" })
    .optional(),
  motherContactNo: z
    .string({ required_error: "Mother contact number is required" })
    .optional(),
});

const updateLocalGuardianSchema = z.object({
  name: z.string({ required_error: "Name is required" }).optional(),
  occupation: z.string({ required_error: "Occupation is required" }).optional(),
  contactNo: z
    .string({ required_error: "Contact number is required" })
    .optional(),
  address: z.string({ required_error: "Address is required" }).optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameSchema.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string({ required_error: "Email is required" })
        .email()
        .optional(),
      contactNo: z
        .string({ required_error: "Contact number is required" })
        .optional(),
      emergencyContactNo: z
        .string({ required_error: "Emergency contact number is required" })
        .optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string({ required_error: "Present address is required" })
        .optional(),
      permanentAddress: z
        .string({ required_error: "Permanent address is required" })
        .optional(),
      guardian: updateGuardianSchema.optional(),
      localGuardian: updateLocalGuardianSchema.optional(),
      admissionSemester: z
        .string({ required_error: "Admission semester is required" })
        .optional(),
      academicDepartment: z
        .string({ required_error: "Academic department is required" })
        .optional(),
    }),
  }),
});
