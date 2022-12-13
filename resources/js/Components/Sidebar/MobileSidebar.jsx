import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Fragment } from "react";


export default function MobileSidebar ({open,setOpen,tags,categories}) {
    const { filters} = usePage().props;
    const [value,setValue] = useState("");
    const handleChange = (e) => setValue(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(value){
            setOpen(false)
            Inertia.post(route(`post.search`,{keyword:value}));
        }
    }
    useEffect(()=>{
        setValue(filters?.search || "")
    },[]);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[9999] md:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                onClick={() => setOpen(false)}
                            >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mt-4 border-t border-gray-200">
                            <div className="px-4">
                                <form className="relative mt-6 mx-4" onSubmit={handleSubmit}>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400"/>
                                    </span>
                                    <input type="text"
                                        value={value} onChange={handleChange}
                                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
                                </form>
                            </div>
                            <Disclosure as="div" className="border-b border-gray-200 py-6 px-4 ">
                                {({ open }) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="text-lg text-gray-900">Categories</span>
                                            <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-4">
                                            { categories.map((category, index) => (
                                                <div key={category.id} className="flex items-center">
                                                    <Link
                                                        href={route(`post.category.index`,category)}
                                                        className="ml-3 text-gray-600"
                                                    >
                                                        {category.title}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="border-b border-gray-200 py-6 px-4 ">
                                {({ open }) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="text-lg text-gray-900">Tags</span>
                                            <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-4">
                                            { tags.map((tag, index) => (
                                                <div key={tag.id} className="flex items-center">
                                                    <Link
                                                        href={route(`post.category.index`,tag)}
                                                        className="ml-3 text-gray-600"
                                                    >
                                                        {tag.title}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                                )}
                            </Disclosure>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
