import { createContext, use, useRef, useState, type ReactNode } from "react";
import { Button } from "../components/CustomComponents.js";

type ModalContextType = {
    ShowModal: (text: string) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const modalRef = useRef(null);

    const ShowModal = (text: string) => { 
        setText(text);
        setIsOpen(true);
    };

    const HideModal = () => { 
        setText('');
        setIsOpen(false);
    };

    return (
        <ModalContext value={{ ShowModal }}>
            {isOpen && <div className="z-[999] fixed inset-0 bg-content flex items-center justify-center" ref={modalRef}>
                <div className="flex flex-col h-50 justify-between">
                    <h2>{text}</h2>
                    <Button className="self-end" onClick={HideModal} style="danger">I understand</Button>
                </div>
            </div>}
            {children}
        </ModalContext>
    );
    
};

export function useModal() {
  const context = use(ModalContext);
  if (!context) { throw new Error("useModal must be used inside ModalProvider"); }
  return context;
}