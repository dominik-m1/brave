import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const BraveVerificationPopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const ageConfirmed = localStorage.getItem("ageConfirmed");
        if (!ageConfirmed) {
            setShowPopup(true);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem("ageConfirmed", "true");
        setShowPopup(false);
    };


    if (!showPopup) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center space-y-4 animate-popup">
                <h2 className="text-2xl font-semibold">Are you ready to BE BRAVE?</h2>
                <div className="flex justify-center">
                    <Image src={logo} alt="Logo" width={200} height={150} />
                </div>
                <p className="text-gray-700">You SHOULD BE BRAVE to enter this site!</p>
                <div className="space-x-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Yes, I am Brave!
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        🫠🫠🫠
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BraveVerificationPopup;
