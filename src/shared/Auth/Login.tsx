"use client";

import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({ setActiveState }: { setActiveState: (e: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Login with Culinary Tom</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="example@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-rose-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="password!@#$%"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-rose-500 block mt-1">
              {`${errors.password.message}`}
            </span>
          )}
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="w-full mt-5 relative mb-1 space-y-4">
          <span
            className={`${styles.label} py-2 text-amber-400 block text-right cursor-pointer hover:underline`}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting}
            className={`${styles.button}`}
          />
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
            Or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursour-pointer ml-2" />
          </div>
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
            Not have any account?
            <span
              className="text-emerald-400 pl-1 cursor-pointer"
              onClick={() => setActiveState("Signup")}
            >
              Sign up
            </span>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Login;
