import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import "../styling/Hero.css";
import heroImage from '../assets/hero-best.png';
import Button from '../components/button';
import { useAuth } from "../hooks/useAuthLogin";
import { useFetchApplications } from "../hooks/useFetchApplications";

export default function RecruiterPage() {
    const { applications, isLoading: isFetchingApplications, error } = useFetchApplications();
    const { role, isLoading: isAuthLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthLoading) {
            if (role !== 1) {
                navigate("/");
            }
        }
    }, [role, isAuthLoading, navigate]);

    
    useEffect(() => {
        if (applications && applications.length > 0) {
            console.log("Fetched Applications:", applications);
        }
    }, [applications]);

    if (isAuthLoading || isFetchingApplications) return <p>Loading...</p>;

    return (
        <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <Navbar />
            <div className="hero-items">
                <div className='submit-container'>
                    {/* Rendera här eller något */}
                </div>
            </div>
        </div>
    );
}

