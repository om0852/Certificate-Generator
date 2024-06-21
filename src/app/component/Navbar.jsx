"use client"
import { useRouter } from "next/router"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import AuthComponent from "./AuthComponent";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    function chooseTemplate() {
        const router = useRouter();
        router.push("/choosetemplate")
    }
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);
    const handleRedirectToAuth = () => {
        router.push('/auth'); // Redirect to the AuthComponent
    };
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </button>
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li onClick={chooseTemplate}>
                                    <a href="/choosetemplate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>

                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                            </li>
                            <li>
                                
                                <Link href="/adminpanel" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>

                            <li>

                                <div className='sm:flex hidden'>
                                    {session?.user ? (<div className='flex gap-3 md:gap-5'>

                                        <button type="button" onClick={() => signOut()} className='outline_btn'>
                                            Sign Out
                                        </button>
                                        <Link href="/profile">
                                            <Image src={session?.user.image} alt="Profile" width={36} height={36} className='rounded-full' />
                                        </Link>
                                    </div>) : (
                                        <>
                                            {/* {providers && Object.values(providers).map((provider) => (
                                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                                    Sign in
                                                </button>
                                            ))} */}
                                            <Link href="/authentication">
                                                Sign in
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className='sm:hidden flex relative'>
                                    {session?.user ? (
                                        <div className='flex'>
                                            <Image src={session?.user.image} alt="Profile" width={36} height={36} className='rounded-full' onClick={() => settoggleDropdown((prev) => !prev)} />
                                            {toggleDropdown && (<div className='dropdown'>
                                                <Link href="/profile" className='dropdown_link' onClick={() => {
                                                    settoggleDropdown(false)
                                                }}>
                                                    My Profile
                                                </Link>

                                                <button
                                                    type='button'
                                                    onClick={() => { signOut(); settoggleDropdown(false) }}
                                                    className='mt-5 w-full black_btn'
                                                >
                                                    Sign Out
                                                </button>
                                            </div>)}
                                        </div>
                                    ) : (
                                        <>
                                            {/* {providers && Object.values(providers).map((provider) => (
                                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                                    Sign in
                                                </button>
                                            ))} */}
                                            <Link href="/authentication">
                                                Sign in
                                            </Link>
                                        </>

                                    )}
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>


            </nav>

        </>
    )
}