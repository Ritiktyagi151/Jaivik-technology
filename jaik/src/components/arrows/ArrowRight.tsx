import { MdKeyboardArrowRight } from "react-icons/md";

const ArrowRight: React.FC<{ onClick?: () => void, className?: string; }> = ({
    onClick,
    className = ''
}) => {
    return (
        <div
            className={`absolute z-50 right-2.5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className="w-9 h-9 rounded-full border-2 border-main-red bg-black text-main-red flex justify-center items-center group/arrow transition-transform">
                <MdKeyboardArrowRight
                    size={26}
                    className="transition-all duration-300 group-hover/arrow:translate-x-1"
                />
            </div>
        </div>
    );
};

export default ArrowRight;
