import { Button } from '../components/Button';

function LoginPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <>
        <Button onClick={() => window.location.href = API_URL + "/auth/google"}>
            Login with Google
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/discord"}>
            Login with Discord
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/github"}>
            Login with Github
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/twitch"}>
            Login with Twitch
        </Button>

        <Button onClick={() => window.location.href = API_URL + "/auth/gitlab"}>
            Login with Gitlab
        </Button>
        </>
    );
}

export default LoginPage;
