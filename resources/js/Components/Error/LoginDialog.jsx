import { Link } from "@inertiajs/inertia-react"
import ErrorTemplate from "./ErrorTemplate"


export default function LoginDialog ({onConfirm,open,title,message,onCancel,afterClose}) {
    return (
        <ErrorTemplate
            onConfirm={onConfirm}
            open={open}
            onCancel={onCancel}
            title={title}
            message={message}
            >
            <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Danger
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <span> Please <Link href={ route(`login`) }
                    onBefore={
                        ()=>{
                            afterClose()
                        }
                    }>Login</Link></span>
            </div>
            </div>
        </ErrorTemplate>
    )
}
