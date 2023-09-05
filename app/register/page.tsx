"use client"
import type { Metadata } from 'next'
import Layout from '@/layout/layout'
import Link from 'next/link'
import styles from '../../public/styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from 'formik';
import { useState } from 'react';
import { Register_api } from '@/api';
import { useRouter } from 'next/navigation';
import { HOME_URL } from '@/config';

import { registerValidate } from '@/lib/validate';

export default function Register() {
    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:"",
            cpassword:""
        },validate:registerValidate,
        onSubmit
    })
    async function onSubmit(values:any) {
        let result=await Register_api(values)
        if (result.user)
            router.push(HOME_URL)
        console.log(result)
    }
    return (
        <Layout>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            </div>

            {/* form */}
            <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <input 
                    type="text"
                    autoComplete='new-password'
                    placeholder='Username'
                    className={styles.input_text}
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {formik.errors.username && formik.touched.username ? <span className='text-rose-500 text-sm'>{formik.errors.username}</span> : <></>}
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    autoComplete='new-password'
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
                    type={`${show.password ? "text" : "password"}`}
                    placeholder='Password'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-sm'>{formik.errors.password}</span> : <></>}
                <div className={styles.input_group}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500 text-sm'>{formik.errors.cpassword}</span> : <></>}
                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Register
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/login'} legacyBehavior><a className='text-blue-700'>Sign In</a></Link>
            </p>
        </section>
        </Layout>
    )
}

