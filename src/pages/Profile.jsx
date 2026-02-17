import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

function ProfilePage() {

    const { user, avatar, IsAuthenticated } = useAuth();

    const { AddToast } = useToast();

    const check = async() => {
        const isauth = await IsAuthenticated();
        AddToast(`You are ${isauth ? "" : "not "}authenticated`, isauth ? "success" : "warning");
    };

    return (
        <>
        <h1>Profile</h1>
        {user?.username && <h2>{user.username}</h2>}
        {user?.uuid && <h2>{user.uuid}</h2>}
        {avatar && <img src={avatar} alt="avatar"/>}

        <button onClick={check}>Check auth</button>
        </>
    );
}

export default ProfilePage;
