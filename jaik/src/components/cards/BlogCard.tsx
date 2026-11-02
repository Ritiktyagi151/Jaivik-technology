"use client";

import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
// Note: Agar interface file mein 'slug' nahi hai, toh use add kar lena
import type { blogInterface } from "../../interfaces/blogInterface";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const MEDIA_BASE = API_BASE.replace("/api", "");

const BlogCard: React.FC<blogInterface> = ({
  category = "",
  author = "",
  createdAt,
  publishedAt,
  title = "",
  summary = "",
  image = "",
  description = "",
  slug = "", 
}) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/blog/${slug}`); 
  };

  const displayDate =
    publishedAt || createdAt
      ? new Date((publishedAt || createdAt) as string).toLocaleDateString()
      : "";

  return (
    <div className="w-full rounded-lg group p-3 gap-2 flex flex-col justify-start items-start bg-main-secondary/80">
      <div className="w-full overflow-hidden rounded-lg">
        <img
          // Port 5002 update kiya aur logic wahi rakha
          src={`${MEDIA_BASE}${image}`}
          alt={title}
          className="group-hover:scale-110 transition-all duration-300 h-[160px] w-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Loop rokne ke liye ye zaroori hai
            target.onerror = null; 
            target.src = "https://via.placeholder.com/300x120?text=No+Image";
          }}
        />
      </div>
      <div className="flex justify-start text-sm w-full items-center gap-x-3 text-neutral-200">
        <h2 className="font-bold text-main-red uppercase text-[10px]">{category}</h2>
        <div className="flex justify-center items-center gap-1">
          <FaRegUser size={10} className="text-main-red" />
          <span className="text-[11px]">{author || "Admin"}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <FaRegCalendarCheck size={10} className="text-main-red" />
          <span className="text-[11px]">{displayDate}</span>
        </div>
      </div>
      <div className="w-full">
        <h4 className="font-extrabold text-white line-clamp-1">{title}</h4>
        <p className="text-neutral-300 text-[13px] line-clamp-2 mt-1">
          {summary && summary !== ""
            ? summary
            : description.substring(0, 80) + "..."}
        </p>
      </div>
      <button
        onClick={handleReadMore}
        className="rounded-sm bg-main-red text-[13px] text-neutral-50 cursor-pointer py-1 px-4 mt-2 font-bold hover:bg-red-700 transition-colors"
      >
        Read Full Story
      </button>
    </div>
  );
};

export default BlogCard;
