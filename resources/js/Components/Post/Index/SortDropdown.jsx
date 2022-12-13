import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, Fragment } from "react";

const sortOptions = [
    { label:'Most Liked',name: 'most_liked', href: route(route().current(),{_query:{sort:"most_liked"}}), current: false },
    { label:'Most Recent',name: 'most_recent', href: route(route().current(),{_query:{sort:"most_recent"}}), current: false },
    { label:'Oldest',name: 'most_old', href: route(route().current(),{_query:{sort:"most_old"}}), current: false },
];
export default function SortDropdown(){
    const filters = usePage().props.filters;
    useEffect(function(){
        sortOptions.map((option) => {
            option.current = (option.name === filters.sort || option.name === `-${filters.sort}`);
        })
    },[])
    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                            {({ active }) => (
                            <Link href={option.href}
                                className={`${option.current ? 'font-medium text-gray-900' : 'text-gray-500'} ${ active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm`}
                            >
                                {option.label}
                            </Link>
                            )}
                        </Menu.Item>
                        ))}
                    </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
    return (
        <>
            <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
            </button>
            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
        </>
    )
}
