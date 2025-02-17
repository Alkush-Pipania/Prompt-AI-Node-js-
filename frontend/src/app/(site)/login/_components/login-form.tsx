"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {config} from 'dotenv'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/schema"
import axios from "axios";


config()

type AuthFormProps = {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [authType, setAuthType] = React.useState<"login" | "signup">(type)
  const router = useRouter()

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signupForm = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginInput | SignupInput) {
    setIsLoading(true);
  
    try {
      const endpoint = authType === "login" ? "signin" : "signup";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${endpoint}`,
        data
      );
  
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId" , response.data.userId);
        toast.success(`Successfully ${authType === "login" ? "logged in" : "signed up"}`);
        router.push("/chat/new");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  

  async function handleGoogleAuth() {
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success(`Successfully ${authType === "login" ? "logged in" : "signed up"} with Google!`)
      router.push("/dashboard")
    } catch (error) {
      toast.error(`Failed to ${authType === "login" ? "login" : "sign up"} with Google. Please try again.`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "signup" : "login")
  }

  return (
    <motion.div
      key={authType}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/5 bg-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {authType === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {authType === "login" ? "Please sign in to continue" : "Please sign up to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 rounded-full px-2 text-gray-400">OR</span>
            </div>
          </div>

          {authType === "login" ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                          disabled={isLoading}
                          className="bg-white/5 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            className="bg-white/5 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className="text-sm text-gray-400">{showPassword ? "Hide" : "Show"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary-purple-500 hover:bg-primary-purple-600 text-text-shady hover:text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continue with email
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          disabled={isLoading}
                          className="bg-white/5 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          {...field}
                          disabled={isLoading}
                          className="bg-white/5 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                          disabled={isLoading}
                          className="bg-white/5 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            className="bg-white/5 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className="text-sm text-gray-400">{showPassword ? "Hide" : "Show"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary-purple-500 hover:bg-primary-purple-600 text-text-shady hover:text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign up
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="link" className="text-sm text-gray-400 hover:text-white" onClick={toggleAuthType}>
            {authType === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Button>
          <p className="text-center text-sm text-gray-400">
            By continuing, you agree to Anthropic&apos;s{" "}
            <Button variant="link" className="h-auto p-0 text-sm text-gray-400 hover:text-white">
              Consumer Terms
            </Button>{" "}
            and{" "}
            <Button variant="link" className="h-auto p-0 text-sm text-gray-400 hover:text-white">
              Usage Policy
            </Button>
            , and acknowledge their{" "}
            <Button variant="link" className="h-auto p-0 text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Button>
            .
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

