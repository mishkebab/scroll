import {createContext , useContext, useEffect, useRef, useState} from "react";
import './modal.css'
import { createPortal } from 'react-dom';

let ModalContext = createContext()

export const ModalProvider = ({children}) => {
    let modalRef = useRef()
    const [value, setValue] = useState()

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef}/> 
        </>
    )
}

export const Modal = ({children, onClose}) => {
    const modalNode = useContext(ModalContext)
    if (!modalNode) return null;

    return (
        <div>
            {createPortal(
                <div id="modal">
                    <div id="modal-background" onClick={onClose} />
                    <div id="modal-content">
                        {children}
                    </div>
                </div>,
                modalNode
            )}
        </div>
    )
}
