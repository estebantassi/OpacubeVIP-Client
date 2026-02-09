import { useEffect } from 'react';
import axios from '../api/Axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LogoutPage() {

    const navigate = useNavigate();
    const { UpdateUser } = useAuth();

    useEffect(() => {
        UpdateUser(null);
        navigate("/home");
    }, []);
}

export default LogoutPage;
