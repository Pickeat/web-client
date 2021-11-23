/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect, Fragment, useState} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {PlusSmIcon} from '@heroicons/react/solid'
import logo from "../assets/logo.png"
import getUserMeApi from "../api/getUserMeApi";
import {useHistory} from "react-router-dom";
import logout from "../helpers/logout";
import isAuth from "../helpers/isAuth";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    {name: 'Main', href: '#/product-list', current: true},
    {name: 'Chat', href: '#/chat', current: false},
]

export default function NavigationBar() {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [url, setUrl] = useState(history.location.pathname);
    const [showBar, setShowBar] = useState(isAuth());


    useEffect(() => {
        if (showBar)
            getUserMeApi().then((res) => {
                setUser(res);
            })
    }, [showBar]);

    useEffect(() => {
        return history.listen((location) => {
            setShowBar(isAuth());
            setUrl(location.pathname);
        })
    }, [history])

    if (!showBar)
        return (<></>)
    return (
        <Disclosure as="nav" className="bg-green-600 shadow">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div onClick={() => history.push('/product-list')}
                                     className="h-full flex items-center">
                                    <div
                                        className={"bg-white h-14 w-14 flex items-center justify-center rounded-full flex-shrink-0"}>
                                        <img
                                            className="block h-10 w-auto"
                                            src={logo}
                                            alt="Workflow"
                                        />
                                    </div>
                                </div>
                                <div className="hidden md:ml-6 md:flex items-center md:space-x-8">
                                    <div className="flex h-10 space-x-4">
                                        {navigation.map((item) => {
                                            item.current = item.href.includes(url);
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-green-900 text-white' : 'text-white hover:bg-green-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-md font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <button
                                        type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                                        text-green-900 bg-gray-100 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                                        onClick={() => history.push("/add-product")}
                                    >
                                        <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                        <span>Add product</span>
                                    </button>
                                </div>
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button
                                                className="bg-white rounded-full flex text-sm outline-none ring-1 ring-offset-1 ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-12 w-12 object-cover rounded-full bg-white"
                                                    src={`https://minio.pickeat.fr/minio/download/users/${user?.image}?token=`}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                style={{zIndex: '9999'}}
                                            >
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="#/profile"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="#/settings"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                logout();
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
