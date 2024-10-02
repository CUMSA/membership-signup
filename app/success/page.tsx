export default function SuccessPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Membership registration received.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Thank you for filling in the membership form. You should receive an email with payment instructions from us
            soon.
          </p>
          <p className="mt-6 max-w-xl text-md leading-8 text-gray-600">
            In the meantime, please fill in this form to provide us with data that is required by the Singapore Global
            Network, one of our sponsors. Please note that this is required for you to attend most of our events, and{' '}
            <span className="font-semibold">data will be deleted permanently after one year</span>.
          </p>
          <div className="mt-10 gap-x-6">
            <a href="https://forms.gle/ETq57Z976MD2ygtP8" className="text-sm font-semibold leading-6 text-gray-900">
              Fill in SGN required data <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
