import React from "react";

const Footer: React.FC = () => {
    return (
        <div>
            <div className="flex flex-col items-center bg-[#0F172A] pt-10">
                <h6 className="mb-6 flex items-center text-center text-4xl font-bold text-white">OUR PARTNERS</h6>
                <div className="flex flex-row justify-center gap-10 max-w-md max-h-md">
                    <a href="#" target="_blank" className="block py-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png" alt="gcp" className="h-xs w-xs" />
                    </a>
                    <a href="#" target="_blank" className="block py-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png" alt="gcp" className="h-xs w-xs" />
                    </a>
                    <a href="#" target="_blank" className="block py-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volkswagen_-_Logo.svg/2048px-Volkswagen_-_Logo.svg.png" alt="gcp" className="h-xs w-xs" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
