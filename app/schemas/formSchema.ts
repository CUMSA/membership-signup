import { z } from 'zod'

export const colleges = [
  "Christ's College",
  'Churchill College',
  'Clare College',
  'Clare Hall',
  'Corpus Christi College',
  'Darwin College',
  'Downing College',
  'Emmanuel College',
  'Fitzwilliam College',
  'Girton College',
  'Gonville and Caius College',
  'Homerton College',
  'Hughes Hall',
  'Jesus College',
  "King's College",
  'Lucy Cavendish College',
  'Magdalene College',
  'Murray Edwards College',
  'Newnham College',
  'Pembroke College',
  'Peterhouse',
  "Queens' College",
  'Robinson College',
  'Selwyn College',
  'Sidney Sussex College',
  "St Catharine's College",
  "St Edmund's College",
  "St John's College",
  'Trinity College',
  'Trinity Hall',
  'Wolfson College',
]

export const courses: string[] = [
  "Anglo-Saxon, Norse, and Celtic, BA (Hons)",
  "Archaeology, BA (Hons)",
  "Architecture, BA (Hons) and MArch",
  "Asian and Middle Eastern Studies, BA (Hons)",
  "Chemical Engineering and Biotechnology, BA (Hons) and MEng",
  "Classics, BA (Hons)",
  "Computer Science, BA (Hons) and MEng",
  "Design, BA (Hons) and MDes",
  "Economics, BA (Hons)",
  "Education, BA (Hons)",
  "Engineering, BA (Hons) and MEng",
  "English, BA (Hons)",
  "Foundation Year, Pre-degree course",
  "Geography, BA (Hons)",
  "History and Modern Languages, BA (Hons)",
  "History and Politics, BA (Hons)",
  "History of Art, BA (Hons)",
  "History, BA (Hons)",
  "Human, Social, and Political Sciences, BA (Hons)",
  "Land Economy, BA (Hons)",
  "Law, BA (Hons)",
  "Linguistics, BA (Hons)",
  "Mathematics, BA (Hons) and MMath",
  "Medicine (Graduate course), MB and BChir",
  "Medicine, MB and BChir",
  "Modern and Medieval Languages, BA (Hons)",
  "Music, BA (Hons)",
  "Natural Sciences, BA (Hons) and MSci",
  "Philosophy, BA (Hons)",
  "Psychological and Behavioural Sciences, BA (Hons)",
  "Theology, Religion, and Philosophy of Religion, BA (Hons)",
  "Veterinary Medicine, VetMB"
];


export const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
export const studentTypes = ['Undergrad', 'Masters', 'PhD', 'Other']

export const formSchema = z.object({
  FirstName: z.string().min(2).max(50),
  LastName: z.string().min(2).max(50),
  Gender: z.enum(['Male', 'Female', 'Non-binary', 'Prefer not to say']),
  DateofBirth: z.date().transform(d => d.toISOString().slice(0, 10)),
  Nationality: z.string().min(2).max(50),
  SingaporeanPR: z.boolean(),
  Crsid: z.string().min(2).max(50),
  AltEmail: z.string().email(),
  MatriculationYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear())
    .transform(d => d.toString()),
  GraduationYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 10)
    .transform(d => d.toString()),
  College: z.enum(colleges as [string, ...string[]]).transform(c => colleges.indexOf(c) + 1),
  Course: z.string().min(2).max(100),
  MembershipType: z.enum(['MembershipTypeLife', 'MembershipTypeYear']),
  UKMobile: z.string().min(8).max(15),
  HomeMobile: z.string().min(8).max(15),
  StudentType: z.enum(studentTypes as [string, ...string[]]),
  Scholarship: z.string().min(2).max(100),
  PrevSchool: z.string().min(2).max(100),
})

export type FormValues = z.infer<typeof formSchema>
