import { useState } from "react";

const ProfileButton = () => {
    const [showMenu, setMenu] = useState(false)
    
    return (
        <div style={{ color: "orange", fontSize: "100px" }}>
            <i className="fa-solid fa-carrot"></i>
        </div>
    )
}

export default ProfileButton;

