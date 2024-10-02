import { useState } from 'react'
import { Datepicker } from 'flowbite-react'
import { Label, Field, Switch } from '@headlessui/react'
import { countries } from '../utils/countries'
import { Select } from './select'
import { colleges, genders, studentTypes } from '../schemas/formSchema'
import { handleSubmit } from '../utils/handleSubmit'

const datepickerTheme = {
  root: {
    base: 'relative',
  },
  popup: {
    root: {
      base: 'absolute top-10 z-50 block pt-2',
      inline: 'relative top-0 z-auto',
      inner: 'inline-block rounded-lg bg-white p-4 shadow-lg ',
    },
    header: {
      base: '',
      title: 'px-2 py-3 text-center font-semibold text-gray-900 ',
      selectors: {
        base: 'mb-2 flex justify-between',
        button: {
          base: 'rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ',
          prev: '',
          next: '',
          view: '',
        },
      },
    },
    view: {
      base: 'p-1',
    },
    footer: {
      base: 'mt-2 flex space-x-2',
      button: {
        base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-indigo-300',
        today: 'bg-indigo-500 text-white hover:bg-indigo-600',
        clear: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'mb-1 grid grid-cols-7',
        title: 'h-6 text-center text-sm font-medium leading-6 text-gray-500 ',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ',
          selected: 'bg-indigo-500 text-white hover:bg-indigo-600',
          disabled: 'text-gray-500',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ',
          selected: 'bg-indigo-500 text-white hover:bg-indigo-600',
          disabled: 'text-gray-500',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100',
          selected: 'bg-indigo-500 text-white hover:bg-indigo-600',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ',
          selected: 'bg-indigo-500 text-white hover:bg-indigo-600',
          disabled: 'text-gray-500',
        },
      },
    },
  },
}

export default function Form() {
  const [agreed, setAgreed] = useState<boolean>(false)

  const [gender, setGender] = useState<string>('Please select')

  const [nationality, setNationality] = useState<string>('Please select')

  const [pr, setPr] = useState<boolean>(false)
  const [UKMobile, setUKMobile] = useState<string>('+44 ')

  const [college, setCollege] = useState<string>('Please select')
  const [studentType, setStudentType] = useState<string>('Please select')
  const [hasScholarship, setHasScholarship] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null)

  let currMembershipCycle = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month < 6) {
    currMembershipCycle -= 1
  }
  const membershipTypes = [
    {
      id: 'MembershipTypeYear',
      title: `£12 — 1 year (${currMembershipCycle}-${currMembershipCycle + 1})`,
    },
    { id: 'MembershipTypeLife', title: '£20 — Life' },
  ]

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      <form
        action="#"
        method="POST"
        className="mx-auto max-w-xl "
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          if (!agreed) {
            setError('Please agree to the data privacy statement.')
            return
          }

          const formData = new FormData(e.target as HTMLFormElement)
          const data = {
            ...Object.fromEntries(formData.entries()),
            Gender: gender,
            Nationality: nationality,
            SingaporeanPR: pr,
            College: college,
            StudentType: studentType,
            Scholarship: hasScholarship ? formData.get('Scholarship') : 'None',
            MatriculationYear: parseInt(formData.get('MatriculationYear') as string),
            GraduationYear: parseInt(formData.get('GraduationYear') as string),
            DateofBirth: new Date(formData.get('DateofBirth') as string),
          }

          try {
            await handleSubmit(data)
          } catch (error) {
            setError((error as Error).message)
          }
        }}
      >
        <p className="text-md font-medium leading-6 text-gray-600 mb-16">
          Do note that membership registration is only available for Cambridge students with a CRSid (this is the front
          part of your university email). After filling in this registration form, you will receive a separate email
          with instructions on how to make payment to confirm your membership.
        </p>

        <hr className="my-16 border-t border-gray-200" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-8">Personal particulars</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="FirstName" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                required
                id="FirstName"
                name="FirstName"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="LastName" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                required
                id="LastName"
                name="LastName"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="DateofBirth" className="block text-sm font-semibold leading-6 text-gray-900">
              Date of birth
            </label>
            <div className="mt-2.5">
              <Datepicker
                id="DateofBirth"
                name="DateofBirth"
                theme={datepickerTheme}
                minDate={new Date(1900, 0, 1)}
                maxDate={
                  new Date(
                    new Date().getFullYear() - 16, // Assume the user is at least 16 years old
                    new Date().getMonth(),
                    new Date().getDate(),
                  )
                }
                defaultDate={new Date(2000, 0, 1)}
              />
            </div>
          </div>

          <Select title="Gender" options={genders} selected={gender} setSelected={setGender} />
          <Select
            title="Nationality"
            options={countries.map(c => c.name)}
            selected={nationality}
            setSelected={setNationality}
          />

          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={pr}
                onChange={setPr}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Singapore PR</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">I am a Singapore Permanent Resident (PR) .</Label>
          </Field>
        </div>
        <hr className="my-16 border-t border-gray-200" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-8">Contact details</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="Crsid" className="block text-sm font-semibold leading-6 text-gray-900">
              Cambridge CRSID
              <p className="text-xs font-medium text-gray-500">This is the front part of your university email</p>
            </label>
            <div className="mt-2.5">
              <input
                required
                id="Crsid"
                name="Crsid"
                placeholder="abc123"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="AltEmail" className="block text-sm font-semibold leading-6 text-gray-900">
              Alternative Email Address
              <p className="text-xs font-medium text-gray-500">Personal email address preferred</p>
            </label>
            <div className="mt-2.5">
              <input
                required
                id="AltEmail"
                name="AltEmail"
                placeholder="alanturing@gmail.com"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="UKMobile" className="block text-sm font-semibold leading-6 text-gray-900">
              UK Mobile Number
            </label>
            <div className="mt-2.5">
              <input
                required
                id="UKMobile"
                name="UKMobile"
                placeholder="+44 1234 567890"
                value={UKMobile}
                onChange={e => {
                  if (e.target.value.startsWith('+44 ')) {
                    setUKMobile(e.target.value)
                  }
                }}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="HomeMobile" className="block text-sm font-semibold leading-6 text-gray-900">
              Home Mobile Number
              <p className="text-xs font-medium text-gray-500">Please include country code</p>
            </label>
            <div className="mt-2.5">
              <input
                required
                id="HomeMobile"
                name="HomeMobile"
                placeholder="+65 1234 5678"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <hr className="my-16 border-t border-gray-200" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-8">College and Course</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="MatriculationYear" className="block text-sm font-semibold leading-6 text-gray-900">
              Matriculation Year
            </label>
            <div className="mt-2.5">
              <input
                required
                id="MatriculationYear"
                name="MatriculationYear"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="GraduationYear" className="block text-sm font-semibold leading-6 text-gray-900">
              Graduation Year
            </label>
            <div className="mt-2.5">
              <input
                required
                id="GraduationYear"
                name="GraduationYear"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Select title="College" options={colleges} selected={college} setSelected={setCollege} />
          <Select title="Student Type" options={studentTypes} selected={studentType} setSelected={setStudentType} />

          <div className="sm:col-span-2">
            <label htmlFor="Course" className="block text-sm font-semibold leading-6 text-gray-900">
              Course
              <p className="text-xs font-medium text-gray-500">
                Specify your qualification + course name (e.g. MPhil Economics)
              </p>
            </label>
            <div className="mt-2.5">
              <input
                required
                id="Course"
                name="Course"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="PrevSchool" className="block text-sm font-semibold leading-6 text-gray-900">
              What was your previous school?
              <p className="text-xs font-medium text-gray-500">
                Please include the name of your last attended school (e.g. your JC, Polytechnic, etc.)
              </p>
            </label>
            <div className="mt-2.5">
              <input
                required
                id="PrevSchool"
                name="PrevSchool"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={hasScholarship}
                onChange={setHasScholarship}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Scholarship</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">I am on a scholarship.</Label>
          </Field>
          {hasScholarship && (
            <div className="sm:col-span-2">
              <label htmlFor="Scholarship" className="block text-sm font-semibold leading-6 text-gray-900">
                Scholarship Name
              </label>
              <div className="mt-2.5">
                <input
                  required
                  id="Scholarship"
                  name="Scholarship"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}
        </div>

        <hr className="my-16 border-t border-gray-200" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-8">Administrative</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Membership Type</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                1 year membership spans the academic year. Signing up for 1 year now means that membership starts in{' '}
                <span className="font-semibold">Oct {currMembershipCycle} </span>
                and ends in <span className="font-semibold">Sep {currMembershipCycle + 1}</span>.
              </p>
              <div className="mt-6 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {membershipTypes.map(membershipTypes => (
                  <div key={membershipTypes.id} className="flex items-center">
                    <input
                      required
                      id={membershipTypes.id}
                      value={membershipTypes.id}
                      name="MembershipType"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={membershipTypes.id}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {membershipTypes.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <p className="text-sm font-semibold leading-6 text-gray-600 sm:col-span-2">
            While CUMSA acknowledges the importance of data privacy, we may occasionally need to release our
            members&apos; details to our sponsors.
          </p>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">I have read and understood the above statement .</Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join CUMSA
          </button>
        </div>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
            {error.split('\r\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}
