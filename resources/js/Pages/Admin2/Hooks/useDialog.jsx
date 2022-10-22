import { Modal } from 'bootstrap'
import { useRef } from 'react'

export default function useDialog() {
    const modal = useRef(null);
    return [
        open = () => {
            console.log("open")
            //return new Modal(modal.current).show()
        },
        close = () => Modal.getInstance(modal.current).hide(),
        modal
    ]
}
