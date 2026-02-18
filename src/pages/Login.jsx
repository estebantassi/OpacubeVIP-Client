import { useEffect, useState } from 'react';
import { Button, Input } from '../components/CustomComponents';
import Axios from '../api/Axios';
import srp from "secure-remote-password/client";
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Turnstile, useTurnstile } from "react-turnstile";

function LoginPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const TURNSTILE = import.meta.env.VITE_TURNSTILE;
    const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_KEY;
    const turnstile = useTurnstile();
    const [turnstileToken, setTurnstileToken] = useState(null);

    const { AddToast } = useToast();
    const { UpdateUser, setAvatar } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });


    const Login = async (e) => {
        e.preventDefault();

        try {
            const fetchSRP = await Axios.post('/auth/loginstart', { email: userData.email, turnstileToken }, {
                withCredentials: true
            });

            const srpSalt = fetchSRP.data.srpSalt;
            const srpServerEphemeral = fetchSRP.data.srpServerEphemeral;

            const srpClientEphemeral = srp.generateEphemeral();
            const srpPrivateKey = srp.derivePrivateKey(srpSalt, userData.email, userData.password);
            const srpClientSession = srp.deriveSession(srpClientEphemeral.secret, srpServerEphemeral, srpSalt, userData.email, srpPrivateKey);

            const checkPassword = await Axios.post('/auth/login', { email: userData.email, srpProof: srpClientSession.proof, srpClientEphemeral: srpClientEphemeral.public }, {
                withCredentials: true
            });

            try { srp.verifySession(srpClientEphemeral.public, srpClientSession, checkPassword.data.srpProof); } catch {
                return AddToast("There was an error verifying the server's authenticity", "error");
            }

            const { avatar, ...newUser } = checkPassword.data.user;
            UpdateUser(newUser);
            setAvatar(checkPassword.data.user.avatar);
            localStorage.setItem("avatar", checkPassword.data.user.avatar);

            AddToast(checkPassword.data.message, "success");
            navigate("/profile");
        } catch (err) {
            turnstile.reset();
            AddToast(err?.response?.data?.message ?? "Error", "error");
        }
    };

    return (
        <>
            <div className={`w-full flex justify-center items-center`}>
                <form className={`px-4 sm:my-20 sm:rounded-xl bg-content flex justify-center flex-col items-center w-full min-h-screen sm:min-h-full lg:w-[50vw] sm:w-[75vw] py-6`} onSubmit={Login}>

                    <div className='w-full flex flex-col items-center gap-2'>
                        <Button type="button" className='bg-[#4285F4] w-full lg:w-[50%] sm:w-[75%] relative flex justify-center items-center' onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=google"}>
                            <img className='w-8 bg-white p-1 absolute left-1' src="brands/google.svg" alt="" />
                            Continue with Google
                        </Button>

                        <Button type="button" className='bg-[#FC6D26] w-full lg:w-[50%] sm:w-[75%] relative flex justify-center items-center' onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=gitlab"}>
                            <img className='w-8 bg-white p-1 absolute left-1' src="brands/gitlab.svg" alt="" />
                            Continue with Gitlab
                        </Button>

                        <Button type="button" className='bg-[#5865F2] w-full lg:w-[50%] sm:w-[75%] relative flex justify-center items-center' onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=discord"}>
                            <img className='w-8 bg-white p-1 absolute left-1' src="brands/discord.svg" alt="" />
                            Continue with Discord
                        </Button>

                        <Button type="button" className='bg-[#181717] w-full lg:w-[50%] sm:w-[75%] relative flex justify-center items-center' onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=github"}>
                            <img className='w-8 bg-white p-1 absolute left-1' src="brands/github.svg" alt="" />
                            Continue with Github
                        </Button>

                        <Button type="button" className='bg-[#9146FF] w-full lg:w-[50%] sm:w-[75%] relative flex justify-center items-center' onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=twitch"}>
                            <img className='w-8 bg-white p-1 absolute left-1' src="brands/twitch.svg" alt="" />
                            Continue with Twitch
                        </Button>


                    </div>

                    <hr className="my-8 w-full lg:w-[75%]" />

                    <Input type="email" className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Email' value={userData.email} onChange={(e) => { setUserData(prev => ({ ...prev, email: e.target.value })); }} />
                    <Input validate={false} type="password" className='w-full lg:w-[50%] sm:w-[75%]' placeholder='Password' value={userData.password} onChange={(e) => { setUserData(prev => ({ ...prev, password: e.target.value })); }} />
                    
                    {TURNSTILE == "true" && 
                        <Turnstile
                        sitekey={TURNSTILE_KEY}
                        onVerify={(token) => {
                            setTurnstileToken(token);
                        }}
                    />}

                    <Button disabled={!turnstileToken && TURNSTILE == "true"} type='submit' style='submit' className='mt-4 mb-4 w-[75%] lg:w-[25%] sm:w-[50%] rounded-xl mx-4'>
                        Login
                    </Button>

                    <p className='text-center'>No account ? <a className='text-blue-500' href="/signup">Create one</a></p>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
