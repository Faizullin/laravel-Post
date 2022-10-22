import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function DestroyModal({onConfirm,st,children,setSt,item,title}){
    function closeModal() {
        setSt(false);
    }
    function openModal() {
        setSt(true);
    }
    function handleConfirm(){
        onConfirm(item);
        closeModal();
    }
    return (
        <Transition appear show={ st } as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="md:flex items-center">
                                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                <i className="bx bx-error text-3xl"></i>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p className="font-bold">{ title }</p>
                                <p className="text-sm text-gray-700 mt-1">{children}
                                </p>
                                </div>
                            </div>
                            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                                <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                                    onClick={ handleConfirm }>Delete Item</button>
                                <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                                md:mt-0 md:order-1"
                                    onClick={closeModal}>Cancel</button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
