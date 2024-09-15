import { z } from "zod"

export const colleges = [
  "Christ's College",
  "Churchill College",
  "Clare College",
  "Clare Hall",
  "Corpus Christi College",
  "Darwin College",
  "Downing College",
  "Emmanuel College",
  "Fitzwilliam College",
  "Girton College",
  "Gonville and Caius College",
  "Homerton College",
  "Hughes Hall",
  "Jesus College",
  "King's College",
  "Lucy Cavendish College",
  "Magdalene College",
  "Murray Edwards College",
  "Newnham College",
  "Pembroke College",
  "Peterhouse",
  "Queens' College",
  "Robinson College",
  "Selwyn College",
  "Sidney Sussex College",
  "St Catharine's College",
  "St Edmund's College",
  "St John's College",
  "Trinity College",
  "Trinity Hall",
  "Wolfson College",
]

export const genders = ["Male", "Female", "Non-binary", "Prefer not to say"]
export const studentTypes = ["Undergrad", "Masters", "PhD", "Other"];

export const formSchema = z.object({
  FirstName: z.string().min(2).max(50),
  LastName: z.string().min(2).max(50),
  Gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
  DateofBirth: z.date().transform((d) => d.toISOString().slice(0, 10)),
  Nationality: z.string().min(2).max(50),
  SingaporeanPR: z.boolean(),
  Crsid: z.string().min(2).max(50),
  AltEmail: z.string().email(),
  MatriculationYear: z.number().int().min(2000).max(new Date().getFullYear()).transform((d) => d.toString()),
  GraduationYear: z.number().int().min(2000).max(new Date().getFullYear() + 10).transform((d) => d.toString()),
  College: z.enum(colleges as [string, ...string[]]).transform(c => colleges.indexOf(c)),
  Course: z.string().min(2).max(100),
  MembershipType: z.enum(["MembershipTypeLife", "MembershipTypeYear"]),
  UKMobile: z.string().min(8).max(15),
  HomeMobile: z.string().min(8).max(15),
  StudentType: z.enum(studentTypes as [string, ...string[]]),
  Scholarship: z.string().min(2).max(100),
  PrevSchool: z.string().min(2).max(100),
})

export type FormValues = z.infer<typeof formSchema>