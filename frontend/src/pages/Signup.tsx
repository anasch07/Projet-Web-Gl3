import { useState } from 'react';
import { Loader } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import LoginRequest from '../models/auth/SignupRequest';
import authService from '../services/AuthService';
import SignupRequest from "../models/auth/SignupRequest";

export default function Signup() {
  const { setAuthenticatedUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupRequest>();

  const onSubmit = async (SignupRequest: SignupRequest) => {
    try {
      SignupRequest.role = "student";
      if (SignupRequest.password !== SignupRequest.confirmPassword) {
        setError("Password and confirm password should be same");
        return;
      }
      const data = await authService.signup(SignupRequest);
      if (data) {
        history.push('/');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="h-full flex justify-center items-center ml-4 mr-4">
      <div className="card w-1/4 shadow ml-4 mr-4">
        <h1 className="mb-3 text-center font-semibold text-4xl">Signup</h1>
        <hr />
        <form
          className="flex flex-col gap-5 mt-8 my-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
              type="text"
              className="input sm:text-lg"
              placeholder="First Name"
              required
              disabled={isSubmitting}
              {...register('firstName')}
          />
          <input
              type="text"
              className="input sm:text-lg"
              placeholder="Last Name"
              required
              disabled={isSubmitting}
              {...register('lastName')}
          />
          <input
            type="text"
            className="input sm:text-lg"
            placeholder="Username"
            required
            disabled={isSubmitting}
            {...register('username')}
          />
          <input
            type="password"
            className="input sm:text-lg"
            placeholder="Password"
            required
            disabled={isSubmitting}
            {...register('password')}
          />

          <input
              type="password"
              className="input sm:text-lg"
              placeholder="Confirm Password"
              required
              disabled={isSubmitting}
              {...register('confirmPassword')}
          />



          <button
            className="btn mt-3 sm:text-lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Signup'
            )}
          </button>
          {/* div if you have account login */}
            <div className="text-center">
                <a href="/login" className="text-blue-500 hover:underline">Already have an account? Login</a>
            </div>



          {error ? (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
              {error}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
