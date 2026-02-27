export type User = {
    uuid: string;
    username: string;
};

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastContent = {
    id: string;
    text: string;
    type: ToastType;
    duration: number;
};