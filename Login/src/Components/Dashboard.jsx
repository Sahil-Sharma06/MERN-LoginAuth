import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/verify');
                if (!response.data.status) {
                    navigate('/'); // Navigate to home if user is not authenticated
                }
            } catch (error) {
                console.error('Error verifying user:', error);
                navigate('/'); // Navigate to home in case of error
            }
        };

        verifyUser();
    }, [navigate]);

    return (
        <div>
            <h2>Welcome to the Dashboard!</h2>
            {/* Add your dashboard content here */}
        </div>
    );
};

export default Dashboard;
