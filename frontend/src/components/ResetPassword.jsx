import React from 'react'

const ResetPassword = () => {
    return (
      

<div className="form w-[400px] pb-[50px] my-5   bg-green-700 mx-auto shadow-lg rounded-[10px]  rounded-1xl">
  <h2 className='text-white text-center text-4xl mt-[60px] py-[50px] '>Register Form</h2>
<form className="max-w-sm mx-auto p-8 flex flex-col justify-center h-[100%] ">

<div className="mb-5 ">
  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
  <input type="password" name='password' id="password"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
</div>
<div className="mb-5">
  <label for="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
  <input type="password" name='confirmPassword' id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
</div>

<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset</button>
</form>
</div>

    )
}

export default ResetPassword