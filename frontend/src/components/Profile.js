import React from 'react';

function Profile(props) {
    const url = "data:image/png;base64,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"
    const profileBoxStyle = {
        border: '2px solid #ccc',
        padding: '20px',
    };
    const slicedDate = props.user.date.slice(0, 10);
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div style={profileBoxStyle} className="profile-box text-center p-4">
                        <h1>My Profile</h1>
                        <img src={url} alt="Contact" className="img-fluid rounded-circle mb-3" />
                        <h2>Name: {props.user.name}</h2>
                        <h2>Email: {props.user.email}</h2>
                        <h2>Date Created: {slicedDate}</h2>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;

