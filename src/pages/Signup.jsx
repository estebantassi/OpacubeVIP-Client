import { Button, Input } from '../components/CustomComponents';
import { useEffect, useState } from 'react';
import srp from "secure-remote-password/client";
import Axios from '../api/Axios';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

function SignupPage() {

    const { AddToast } = useToast();
    const { UpdateUser, setAvatar } = useAuth();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        emailcheck: "",
        password: "",
        passwordcheck: ""
    });

    const [validity, setValidity] = useState({
        username: false,
        email: false,
        emailcheck: false,
        password: false,
        passwordcheck: false
    });

    const [code, setCode] = useState('');
    const [codeValidity, setCodeValidity] = useState(false);

    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);

    const [codeRequested, setCodeRequested] = useState(false);

    useEffect(() => {
        setDisabled(!Object.values(validity).every(Boolean));
    }, [validity]);

    const navigate = useNavigate();

    const Signup = async (e) => {
        e.preventDefault();

        try {
            const srpSalt = srp.generateSalt();
            const srpPrivatekey = srp.derivePrivateKey(srpSalt, userData.email, userData.password);
            const srpVerifier = srp.deriveVerifier(srpPrivatekey);

            const { password, passwordcheck, ...data } = userData;
            await Axios.post('/auth/signup', { ...data, srpSalt, srpVerifier }, {
                withCredentials: true
            });

            setCodeRequested(true);
        } catch (err) {
            AddToast(err?.response?.data?.message ?? "Error", "error");
        }
    };

    const Verify = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('/auth/verify', {}, {
                withCredentials: true
            });

            const { avatar, ...newUser } = response.data.user;
            UpdateUser(newUser);
            setAvatar(response.data.user.avatar);
            localStorage.setItem("avatar", response.data.user.avatar);

            AddToast(response.data.message, "success");
            navigate("/profile");
        } catch (err) {
            AddToast(err?.response?.data?.message ?? "Error", "error");
        }
    };

    useEffect(() => {
        if ((userData.email || userData.emailcheck) && userData.email !== userData.emailcheck) return setError("Emails don't match");
        if ((userData.password || userData.passwordcheck) && userData.password !== userData.passwordcheck) return setError("Passwords don't match");

        setError(null);
    }, [userData]);

    return (
        <>
            <div className={`w-full flex justify-center items-center`}>
                <form onSubmit={codeRequested ? Verify : Signup} className={`px-4 sm:my-20 sm:rounded-xl bg-content flex justify-center flex-col items-center w-full min-h-screen sm:min-h-full lg:w-[50vw] sm:w-[75vw] py-6`}>
                    
                    {codeRequested ? <>
                    
                    <p className='text-center'>Please enter the verification code sent to your email below:</p>

                    <Input type="code" setValid={(isValid) => setCodeValidity(isValid) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Code' value={code} onChange={(e) => { setCode(e.target.value); }}/>
                    
                    <Button type='submit' style='submit' disabled={!codeValidity} className='mb-6 w-[75%] lg:w-[25%] sm:w-[50%] rounded-xl'>
                        Verify
                    </Button>
                    
                    </> : <>

                    <Input type="username" setValid={(isValid) => setValidity(v => ({ ...v, username: isValid })) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Username' value={userData.username} onChange={(e) => { setUserData(prev => ({ ...prev, username: e.target.value })); }}/>
                    <Input type="email" setValid={(isValid) => setValidity(v => ({ ...v, email: isValid })) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Email' value={userData.email} onChange={(e) => { setUserData(prev => ({ ...prev, email: e.target.value })); }}/>
                    <Input type="email" setValid={(isValid) => setValidity(v => ({ ...v, emailcheck: isValid })) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Email verification' value={userData.emailcheck} onChange={(e) => { setUserData(prev => ({ ...prev, emailcheck: e.target.value })); }}/>
                    <Input type="password" setValid={(isValid) => setValidity(v => ({ ...v, password: isValid })) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Password' value={userData.password} onChange={(e) => { setUserData(prev => ({ ...prev, password: e.target.value })); }}/>
                    <Input type="password" setValid={(isValid) => setValidity(v => ({ ...v, passwordcheck: isValid })) } className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Password verification' value={userData.passwordcheck} onChange={(e) => { setUserData(prev => ({ ...prev, passwordcheck: e.target.value })); }}/>
                    <p className='text-red-500'>{error || "\u00A0"}</p>
                    <Button type='submit' style='submit' disabled={disabled} className='mb-6 w-[75%] lg:w-[25%] sm:w-[50%] rounded-xl'>
                        Signup
                    </Button>

                    <p className='text-center mb-4'>Already have an account ? <a className='text-blue-500' href="/login">Login</a></p>

                    <p className='text-center'>Your password is NEVER sent to my server. See <a className='text-blue-500' target="_blank" href="https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol">SRP.</a></p>
                    <p className='text-center'>Want to see my code ? It's on <a className='text-blue-500' target="_blank" href="https://github.com/estebantassi">Github.</a></p>
                    </>}
                </form>
            </div>
        </>
    );
}

export default SignupPage;
