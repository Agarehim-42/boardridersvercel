import React, { useState } from 'react';
import { useResetPasswordMutation } from '../redux/api/authApi';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // URL'deki token bilgisini alır
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await resetPassword({ token, password, confirmPassword }).unwrap();
      console.log("Password reset successful", result);
      // İşlem başarılı ise kullanıcıya bildirim veya yönlendirme yapabilirsiniz.
    } catch (err) {
      console.error("Password reset failed", err);
    }
  };

  return (
    <div className="form w-[500px] bg-blue-950 mx-auto shadow-lg rounded-lg pb-[50px]">
      <h2 className="text-white text-center text-4xl mt-[60px] py-[50px]">Reset Password</h2>
      <form className="max-w-sm mx-auto p-[30px] flex flex-col justify-center" onSubmit={submitHandler}>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Repeat password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="repeat-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error.data?.message || "An error occurred. Please try again."}
          </div>
        )}

        {isSuccess && <div className="text-green-500 text-sm">Password has been reset successfully!</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
