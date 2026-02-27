import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';

function LogoutPage() {

    const navigate = useNavigate();
    const { UpdateUser } = useAuth();

    useEffect(() => {
        UpdateUser(null);
        navigate("/home");
    }, []);

    return (
        <></>
    );
}

export default LogoutPage;