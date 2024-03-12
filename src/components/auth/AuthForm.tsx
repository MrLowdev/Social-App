"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthErrorType, AuthStateType } from "@/types/type";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
    username: "",
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [router, status]);

  const HandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/auth/register", authState)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          if (response.status === 200) {
            router.push(`/home`);
          }
          if (response.status === 400) {
            toast({
              title: "Error",
              description: response.errors.message,
              className: "bg-red-300",
            });
          }
        })
        .catch((err) => {
          setLoading(false);

          if (err.response.data.status === 400) {
            toast({
              title: "Error",
              description: err.response.data.errors.message,
              className: "bg-red-300",
            });
          }
          if (err.response.data.errors.username) {
            toast({
              title: "Error",
              description: err.response.data.errors.username,
              className: "bg-red-300",
            });
          }
          if (err.response.data.errors.name) {
            toast({
              title: "Error",
              description: err.response.data.errors.name,
              className: "bg-red-300",
            });
          }

          if (err.response.data.errors.email) {
            toast({
              title: "Error",
              description: err.response.data.errors.email,
              className: "bg-red-300",
            });
          }
          if (err.response.data.errors.password) {
            toast({
              title: "Error",
              description: err.response.data.errors.password,
              className: "bg-red-300",
            });
          }
          if (err.response.data.errors.password_confirmation) {
            toast({
              title: "Error",
              description: err.response.data.errors.password_confirmation,
              className: "bg-red-300",
            });
          }
        });
    }

    if (variant === "LOGIN") {
      axios
        .post("/api/auth/login", authState)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          if (response.status == 200) {
            signIn("credentials", {
              email: authState.email,
              password: authState.password,
              callbackUrl: "/home",
              redirect: true,
            });
          } else if (response.status == 400) {
            setErrors(response.errors);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.status === 400) {
            toast({
              title: "Error",
              description: err.response.data.errors.message,
              className: "bg-red-300",
            });
          }
        });
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  return (
    <div>
      {variant === "LOGIN" && params.get("message") ? (
        <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
          <strong>Success!</strong> {params.get("message")}
        </div>
      ) : null}
      <form onSubmit={HandleSubmit}>
        <div className="mt-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                {variant === "LOGIN" ? "Login" : "Register"}
              </h1>
              <p>
                {variant === "LOGIN"
                  ? "Welcome back"
                  : "Welcome to the threads"}
              </p>
            </div>
          </div>
          {variant === "REGISTER" && (
            <>
              <div className="mt-5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Type your name..."
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors?.name}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="username">UserName</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Type your username..."
                  onChange={(e) =>
                    setAuthState({ ...authState, username: e.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors?.username}
                </span>
              </div>
            </>
          )}

          <div className="mt-5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Type your email.."
              onChange={(event) =>
                setAuthState({ ...authState, email: event.target.value })
              }
            />
            <span className="text-red-400 font-bold">{errors?.email}</span>
          </div>
          <div className="mt-5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Type your password.."
              onChange={(event) =>
                setAuthState({ ...authState, password: event.target.value })
              }
            />
            <span className="text-red-400 font-bold">{errors?.password}</span>
          </div>
          {variant === "REGISTER" && (
            <div className="mt-5">
              <Label htmlFor="password_confirmation">
                Password confirmation
              </Label>
              <Input
                type="password"
                id="password_confirmation"
                placeholder="Type your password confirmation.."
                onChange={(event) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: event.target.value,
                  })
                }
              />
              <span className="text-red-400 font-bold">{errors?.password}</span>
            </div>
          )}
          <div className="mt-5">
            {variant === "LOGIN" ? (
              <Button className="w-full" disabled={loading}>
                {loading ? "Processing ..." : "Login"}
              </Button>
            ) : (
              <Button className="w-full" disabled={loading}>
                {loading ? "Processing ..." : "Register"}
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          {variant === "LOGIN"
            ? "New to Social media"
            : "Already have an account?"}
        </div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
