"use client";

import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AiFillGithub,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/src/graphql/actions/register.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
  phone_number: z
    .number()
    .min(10, "Phone number must be at least 10 characters!"),
});

type RegisterSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      localStorage.setItem(
        "activation_token",
        response.data.register.activation_token
      );
      toast.success("Please check your email to activate your account!");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Login with Culinary Tom</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className={`${styles.label}`}>Enter your Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Your Name"
            className={`${styles.input}`}
          />
          {errors.name && (
            <span className="text-rose-500 block">
              {`${errors.name.message}`}
            </span>
          )}
        </div>
        <div>
          <label className={`${styles.label}`}>Enter your Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="example@gmail.com"
            className={`${styles.input}`}
          />
          {errors.email && (
            <span className="text-rose-500 block">
              {`${errors.email.message}`}
            </span>
          )}
        </div>
        <div className="w-full relative">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your Phone Number
          </label>
          <input
            type="number"
            {...register("phone_number", { valueAsNumber: true })}
            placeholder="+84*********"
            className={`${styles.input}`}
          />
          {errors.phone_number && (
            <span className="text-rose-500 block">
              {`${errors.phone_number.message}`}
            </span>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            {...register("password")}
            placeholder="password!@#$%"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-rose-500 block">
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
        <div className="w-full relative space-y-4">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`${styles.button}`}
          >
            Submit
          </button>
          <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
            Or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursour-pointer ml-2" />
          </div>
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
            Already have an account?
            <span
              className="text-emerald-400 pl-1 cursor-pointer"
              onClick={() => setActiveState("Login")}
            >
              Login
            </span>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Signup;
