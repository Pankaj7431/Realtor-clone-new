import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }
  return (
    <section>
      <h1 className="text-center font-bold text-4xl">Sign In</h1>
      <div className="flex-wrap flex justify-center px-5 py-16 max-w-6xl mx-auto items-center">
        <div className="md:w-[68%] lg:w-[48%] mb-12 mg:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fHww"
            alt=""
            className="align-center w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="email"
                value={email}
                className="w-full px-5 py-3 text-xl
              text-gray-700 bg-gray-100 m-1 rounded-2xl transition ease-in-out"
                onChange={onChange}
                id="email"
                placeholder="Email Address"
              />
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg ml-2 mt-2">
              <p>
                Don't Have Account?
                <Link
                  to="/sign-up"
                  className="text-red-500 hover:text-red-700 transition duration-400 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:text-blue-700  transition duration-400 ease-in-out ml-1"
                >
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button
              className="w-[100%] bg-blue-500 hover:bg-blue-800 transition duration-700 
          ease-in-out font-medium uppercase text-white m-1 
          rounded-2xl px-2 py-2 mt-2 hover:shadow-3xl 
          active:bg-blue-950"
              type="submit"
            >
              Send Password Reset
            </button>
            <div
              className="my-5 before:border-t flex before:flex-1 
          items-center before:border-gray-400
          after:border-t after:flex-1 
          after:border-gray-400"
            >
              <p className="text-center font-semibold mx-5">OR</p>
            </div>
          </form>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
