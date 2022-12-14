import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import { useRouter } from 'next/router'

export default function LoginScreen() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', { redirect: false })
      console.log('Github login: ' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const googleLoginHandler = async () => {
    try {
      const result = await signIn('google', { redirect: false })
      console.log('Google login: ' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const kakaoLoginHandler = async () => {
    try {
      const result = await signIn('kakao', { redirect: false })
      console.log('Kakao login: ' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const naverLoginHandler = async () => {
    try {
      // await signIn('naver', { redirect: false })
      const result = await signIn('naver', { redirect: false })
      console.log('Naver login: ' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-xl mb-4">Login</h1>

        <div className="mb-4 p-4 m-4">
          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                message: '????????? ????????? ????????? ???????????????',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 3,
                message: '??????????????? 3??? ???????????? ???????????????.',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <button className="primary-button mt-2" type="submit">
            Login
          </button>
          <div className=" mt-4">
            ????????? ????????? ???????????????... &nbsp;
            <Link href="register">
              <a>Register</a>
            </Link>
          </div>
        </div>

        <div className="p-4 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full"
              onClick={githubLoginHandler}
            >
              Github Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              onClick={googleLoginHandler}
            >
              Google Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              onClick={kakaoLoginHandler}
            >
              ????????? ?????????
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              onClick={naverLoginHandler}
            >
              ????????? ?????????
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
