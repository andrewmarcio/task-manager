import { z } from 'zod'

const atLeastOneDigit = /.*\d.*/
const atLeastOneLowercaseCharacter = /.*[a-z].*/
const atLeastOneUppercaseCharacter = /.*[A-Z].*/
const hasSpecialCharacters = /.*[^A-Za-z0-9].*/

export const LoginValidationSchema = z.object({
    email: z.string().email().nonempty("Email is required!"),
    password: z.string().min(8, {message: "Password must contain at least 8 character(s)"}).nonempty("Password is required!"),
})

export const RegisterValidationSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email().nonempty("Email is required!"),
    password: z.string()
        .min(8, {message: "Password must contain at least 8 character(s)"})
        .regex(atLeastOneDigit, 'It must contain a number')
        .regex(atLeastOneLowercaseCharacter, 'Must contain a small letter')
        .regex(atLeastOneUppercaseCharacter, 'Must contain a capital letter')
        .regex(hasSpecialCharacters, 'Must contain a special character')
        .nonempty("Password is required!"),
})
