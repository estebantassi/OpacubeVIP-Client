import { useAuth } from "../contexts/AuthContext";

function HomePage() {
    const { user } = useAuth();

    return (
        <>
        <h1>Home</h1>
        
        {user?.avatar && <img src={user.avatar} alt="avatar"/>}
        </>
    );
}

export default HomePage;
