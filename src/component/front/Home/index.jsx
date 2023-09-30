import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate("/MOTOR");
    });
    
    return (
        <div></div>
    )
}

export default Home