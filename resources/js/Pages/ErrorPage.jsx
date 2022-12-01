import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function ErrorPage({ status }) {
  const title = {
    503: 'Service Unavailable',
    500: 'Server Error',
    404: 'Page Not Found',
    403: 'Forbidden',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status]

  return (
    <div
        className="
        flex
        items-center
        justify-center
        w-screen
        h-screen
        bg-gradient-to-r
        from-indigo-600
        to-blue-400
        "
    >
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-blue-600 text-9xl">{ status }</h1>

                <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> { title }
                </h6>

                <p className="mb-8 text-center text-gray-500 md:text-lg">
                    { description }
                </p>

                <Link
                    href={ route(`pages.home`) }
                    className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                >
                    Go home
                </Link >
            </div>
        </div>
    </div>
  )
}
