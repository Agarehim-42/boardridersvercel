"use client"

import { useState } from "react"
import { useForgotPasswordMutation } from "../redux/api/authApi"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [forgotPassword, { isLoading, isSuccess, error }] = useForgotPasswordMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const result = await forgotPassword({ email }).unwrap()
      console.log("Forgot password request successful", result)
    } catch (err) {
      console.error("Forgot password request failed", err)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            Don't fret! Just type in your email and we will send you a code to reset your password!
          </p>

          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error.data?.message || "An error occurred. Please try again."}
              </div>
            )}

            {isSuccess && <div className="text-green-500 text-sm">Şifrə sıfırlama linki emailinizə göndərildi!</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-[#1d4ed8] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading ? "Göndərilir..." : "Şifrəmi Sıfırla"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword

