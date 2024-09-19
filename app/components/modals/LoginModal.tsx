"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../button/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/login", data)
      .then(() => {
        loginModal.onClose();
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Login into your account!!" />
      <Input
        id="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        label="Email"
        required
        type="email"
      />
      <Input
        id="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        label="Password"
        required
        type="password"
      />{" "}
    </div>
  );
  const footerContent = (
    <div
      className="flex flex-col gap-4 mt-3
    "
    >
      <hr />
      <Button
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
        outline
      />
      <Button
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        outline
      />
      <div
        className="
      text-neutral-500
      text-center
      mt-4
      font-light
      "
      ></div>
    </div>
  );
  return (
    <Modal
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
