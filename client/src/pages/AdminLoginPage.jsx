import { useState } from "react";
import { useAdminAuth } from "../contexts/adminAuthentication";
import ExclamationIcon from "../assets/icons/exclamation-icon.svg";
import { checkLoginErrors, updateErrors } from "../utils/errors";
import vectorHouse from "../assets/icons/Vector-house.svg";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, state } = useAdminAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    if (id === "email") {
      setEmail(value);
      newErrors = updateErrors("email", value, newErrors);
    } else if (id === "password") {
      setPassword(value);
      newErrors = updateErrors("password", value, newErrors);
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };
    const validationErrors = checkLoginErrors(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      await login(formData);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col px-4">
        <div className="p-2 flex items-center justify-center mb-[25px] mx-5 -mt-20 ">
          <img
            src={vectorHouse}
            alt="House"
            className="w-[69.33px] h-[69.33px]"
          />
          <span className="text-[#336DF2] text-[45px] font-medium ">
            HomeServices
          </span>
        </div>
        <div className="w-full max-w-md p-8 bg-white rounded-lg border border-gray-300 shadow-md">
          <h2 className="text-[24px] font-medium mb-4 text-center text-blue-950 mt-2">
            เข้าสู่ระบบแอดมิน
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                อีเมล
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="กรุณากรอกอีเมล"
                />
                {errors.email && (
                  <img
                    src={ExclamationIcon}
                    alt="error"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="กรุณากรอกรหัสผ่าน"
                />
                {errors.password && (
                  <img
                    src={ExclamationIcon}
                    alt="error"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            {state.error && (
              <div className="mb-4 text-red-600">{state.error}</div>
            )}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-800"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
