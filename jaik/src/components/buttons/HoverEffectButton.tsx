import type React from "react"
const HoverEffectButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
}> = ({
    children,
    onClick,
}) => {
    return <>
        <button
            className="inline-block mt-5 bg-red-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 cursor-pointer relative overflow-hidden group"
            role="button"
            aria-label="Explore Service Details"
            onClick={onClick}
        >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
            {children}
        </button>
    </>
}

export default HoverEffectButton;