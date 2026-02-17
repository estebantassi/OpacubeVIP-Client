import { createContext, useContext, useRef, useState } from "react";
import { Button } from "../components/CustomComponents";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const modalRef = useRef(null);

    const ShowModal = (text) => { 
        setText(text);
        setIsOpen(true);
    };

    const HideModal = () => { 
        setText('');
        setIsOpen(false);
    };

    let contextData = {
        ShowModal,
    };

    return (
        <ModalContext.Provider value={contextData}>
            {isOpen && <div className="z-[999] fixed inset-0 bg-content flex items-center justify-center" ref={modalRef}>
                <div className="flex flex-col h-50 justify-between">
                    <h2>{text}</h2>
                    <Button className="self-end" onClick={HideModal} type="danger">I understand</Button>
                </div>
            </div>}
            {children}
        </ModalContext.Provider>
    );
    
};

export const useModal = () => useContext(ModalContext);