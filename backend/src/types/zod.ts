import {z} from 'zod';

export const generateSchema = z.object({
  userId: z.string().describe("userId of the user"),
  userInput: z.string().describe("User input to generate prompt"),
  promptType: z.string().describe("Type of prompt to generate").refine(
    (val) => val === "normal" || val === "deepthink",
    {
      message: "promptType must be either 'normal' or 'deepthink'",
    }
  ),
});

export const userSignupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});


export const userSigninSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})
