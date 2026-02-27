import { useState } from "react";
import { Info } from 'lucide-react';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../env.js";
import { ValidateEmail, ValidatePassword, ValidateUsername } from "../helpers/Validate.js";

type ButtonContent = {
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: "none" | "submit" | "secondary" | "danger";
    type?: undefined | "button" | "submit" | "reset";
    className?: string;
};

export const Button = ({ disabled = false, children, onClick, style = "none", type, className = "" }: ButtonContent) => {
	const baseStyles = `px-4 py-2 rounded font-medium transition-colors hover:cursor-pointer ${disabled ? "opacity-25" : "hover:opacity-75 transition-opacity"}`;

	const styles = {
		"none": "",
		"submit": `bg-black`,
		"secondary": `bg-gray-200 text-gray-800`,
		"danger": `bg-red-500 text-white`,
	};

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`${baseStyles} ${styles[style]} ${className}`}
			type={type}
		>
			{children}
		</button>
	);
};

type InputContent = {
    validate?: boolean;
    setValid?: (isValid: boolean) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
    value?: string;
    className?: string;
	placeholder?: string;
	type?: string;
};

export const Input = ({
	validate = true, //If false, disable format checking
	setValid, //Returns the validity of the component (validate must be true for this to work)
	onChange,
	value = "",
	className = "",
	placeholder = "",
	type = ""
} : InputContent) => {

	const [error, setError] = useState<string | null>(null);
	const [show, setShow] = useState(false);

	return (
		<>
		<div className={`${className} relative m-2`}>
			<input placeholder={placeholder} type={type} value={value} className={`w-full rounded-lg p-2 ${error ? 'pr-10 outline outline-red-500' : 'outline-none'} bg-accent`} onChange={(e) => {
				if (onChange) onChange(e);

				if (!validate) return;

				if (e.target.value == "") {
					setValid?.(false);
					return setError(null);
				}

				switch (type) {
					case "password":
						if (!ValidatePassword(e.target.value)){
							setValid?.(false);
							return setError(`Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`);
						}
						break;
					case "email":
						if (!ValidateEmail(e.target.value)){
							setValid?.(false);
							return setError("Incorrect email format");
						}
						break;
					case "username":
						if (!ValidateUsername(e.target.value.toLowerCase())){
							setValid?.(false);
							return setError(`Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`);
						}
						break;
					case "code":
						if (e.target.value.length != 6) {
							setValid?.(false);
							return setError("Code must be 6 characters");
						}
						break;
					default:
						break;
				}

				setValid?.(true);
				return setError(null);
			}}
			/>
			{error && <Info
			className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:cursor-pointer"
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			/>}

			{show && error && (
			<div className="absolute right-0 bottom-10 select-none w-max p-2 bg-black text-white text-sm rounded-md z-[9999]">
				{error}
			</div>
			)}
			</div>
		</>
	);
};