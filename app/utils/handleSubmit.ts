import { fromError } from 'zod-validation-error'
import { formSchema } from '../schemas/formSchema'
import axios from 'axios'

export const API_URL = 'https://api.cumsa.org/membership'

export const handleSubmit = async (data: unknown) => {
  const result = formSchema.safeParse(data)
  if (!result.success) {
    throw new Error(
      fromError(result.error, {
        issueSeparator: '\r\n',
      }).toString(),
    )
  }

  await axios
    .post(`${API_URL}/saveToDb`, result.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      window.location.href = '/success'
    })
    .catch(e => {
      console.log(e)
      if (e.response.data.name == 'ConditionalCheckFailedException') {
        throw new Error(`You have already registered as ${result.data.Crsid}.`)
      } else {
        throw new Error('Server Err. ' + e.response.data.message)
      }
    })
}
