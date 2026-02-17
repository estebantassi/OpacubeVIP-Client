import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../env";

export const ValidateEmail = ((email) => {
	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email != null && email.test(reg);
});

export const ValidateUsername = ((username) => {
	return username != null && username?.length >= USERNAME_MIN_LENGTH && username?.length <= USERNAME_MAX_LENGTH;
});

export const ValidatePassword = ((password) => {
	return password != null && password?.length >= PASSWORD_MIN_LENGTH && password?.length <= PASSWORD_MAX_LENGTH;
});