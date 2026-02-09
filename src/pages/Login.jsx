import { Button } from '../components/Button';

function LoginPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <>
        <Button onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=google"}>
            Login with Google
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=discord"}>
            Login with Discord
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=github"}>
            Login with Github
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=twitch"}>
            Login with Twitch
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/oauth/login?provider=gitlab"}>
            Login with Gitlab
        </Button>
        </>
    );
}

export default LoginPage;
