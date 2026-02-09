import { createContext, useContext  , useRef, useState } from "react";
import { Toast } from "../components/Toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([]);

    const lastToastTimeRef = useRef(Date.now());

    const AddToast = (text = "", type = "info", duration = 5000) => {
        const now = Date.now();
        const timeSinceLast = now - lastToastTimeRef.current;

        const delay = Math.max(0, 500 - timeSinceLast);
        lastToastTimeRef.current = now + delay;

        setTimeout(() => {
            const id = crypto.randomUUID();
            setToasts(prev => [...prev, { id, text, type, duration, removing: false }]);

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }, delay);
    };

    let contextData = {
        AddToast
    };

    return (
        <ToastContext.Provider value={contextData}>
            <div className="fixed right-0 top-0 z-50 max-w-sm w-fit flex flex-col m-4 gap-4 break-words">
                {toasts.map(t => (
                    <Toast key={t.id} type={t.type} text={t.text} duration={t.duration}/>
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );

};

export const useToast = () => useContext(ToastContext);