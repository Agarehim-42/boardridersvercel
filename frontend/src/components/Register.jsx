import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [err, setErr] = useState('');

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErr('Şifrələr uyğun deyil');
      return;
    }

    setErr('');
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();
    } catch (err) {
      setErr(error?.data?.message || 'Sorgu göndərilərkən xəta baş verdi');
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto my-24">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          {/* Üst hissədə logo/marka */}
          <div className="flex items-center space-x-5 justify-center mb-4">
            <h1 className="text-center text-3xl font-bold text-[#fe9034]">Welcome to Boardriders</h1>
          </div>

          {/* Form başlığı */}
          <h1 className="text-center text-xl font-semibold text-gray-900 mt-4">
            Create an account
          </h1>

          <form className="mt-5" onSubmit={handleSubmit}>
            {/* Ad sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">
                Your Name
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* E-mail sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">
                E-mail
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Şifrə sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">
                Password
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Şifrəni təsdiq sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Xəta mesajı */}
            {err && <p className="text-red-500 mb-5">{err}</p>}

            {/* Google və Apple ilə daxil olma düymələri */}
            <div className="flex justify-center w-full items-center">
              <div>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  <svg viewBox="0 0 24 24" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336" />
                    <path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3" />
                    <path d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z" fill="#FFC107" />
                  </svg>
                  <span className="ml-2">Sign in with Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4"
                >
                  <svg viewBox="0 0 30 30" height={30} width={30} xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z" />
                  </svg>
                  <span className="ml-2">Sign in with Apple</span>
                </button>
              </div>
            </div>

            {/* Submit düyməsi */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-4 bg-[#fe9034] hover:bg-[#e6872e] focus:ring-[#fe9034] focus:ring-offset-[#fe9034] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                {isLoading ? 'Hesabınız yaradılır...' : 'Hesab yarat'}
              </button>
            </div>

            {/* Alt hissədə login yönləndirməsi */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4" />
              <Link to="/login" className="text-xs text-gray-500 uppercase hover:underline">
                or sign in
              </Link>
              <span className="w-1/5 border-b md:w-1/4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
