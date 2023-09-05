"use client"
import type { Metadata } from 'next'
import Layout from '@/layout/layout'
import Link from 'next/link'
import styles from '../../public/styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import {signIn,signOut} from 'next-auth/react'
import { useFormik } from 'formik';
import login_validate from '@/lib/validate';
import { useRouter } from 'next/navigation';
import { HOME_URL } from '@/config';

export default function Login() {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate:login_validate
        ,
        onSubmit
    })
    async function onSubmit(values:any) {
        const status:any = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })
        if(status.ok) router.push(HOME_URL)
     
    }
  const  handleGooleSignIn=()=>{
    signIn('google',{callbackUrl:HOME_URL})
  }
  const  handleGithubSignIn=()=>{
    console.log('home url',HOME_URL)
    signIn('github',{callbackUrl:HOME_URL})
  }
  return <Layout >
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
            </div>

            {/* form */}
            <form autoComplete='off' onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                <div className={styles.input_group}>
                    <input  
                    autoComplete='new-password'
                    type="email"
                    placeholder='Email'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-sm'>{formik.errors.email}</span> : <></>}
                <div className={styles.input_group}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    placeholder='Password'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}

                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                    
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-sm'>{formik.errors.password}</span> : <></>}
                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGooleSignIn} className={styles.button_custom}>
                        Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} alt={''} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGithubSignIn} className={styles.button_custom}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25} alt={''}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                don&apos;t have an account yet? <Link legacyBehavior href={'/register'}><a className='text-blue-700'>Sign Up</a></Link>
            </p>
        </section>
  </Layout>
}