import React, { useRef } from "react";

const TechUsed: React.FC = () => {
    const techsRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const techs = techsRef.current;
        if (techs) {
            const { width, height, left, top } = techs.getBoundingClientRect();
            const x = ((e.clientX - left) / width - 0.5) * 20;
            const y = ((e.clientY - top) / height - 0.5) * 20;
            techs.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
        }
    };

    const handleMouseLeave = () => {
        const techs = techsRef.current;
        if (techs) {
            techs.style.transform = "perspective(1000px) rotateX(10deg) rotateY(20deg)";
        }
    };

    return (
        <aside
            className="techs"
            ref={techsRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img src="Images/aboutImages/html-logo.png" alt="HTML Icon" title="HTML Icon" />

            <img src="Images/aboutImages/css-logo.webp" alt="CSS Icon" title="CSS Icon" />
            <img src="Images/aboutImages/bootstrap-logo.png" alt="Bootstrap Icon" title="Bootstrap Icon" />
            <img src="Images/aboutImages/js-logo.webp" alt="JavaScript Icon" title="JavaScript Icon" />
            <img src="Images/aboutImages/typescript-logo.webp" alt="TypeScript Icon" title="TypeScript Icon" />
            <img src="logo192.png" alt="React Icon" title="React Icon" />
        </aside>
    );
};

export default TechUsed;
