import type { SocialMediaPost } from "./socialMedia";

interface SocialMediaTableProps {
  posts: SocialMediaPost[];
  onEdit: (post: SocialMediaPost) => void;
  onDelete: (id: string) => void;
}

const SocialMediaTable = ({
  posts,
  onEdit,
  onDelete,
}: SocialMediaTableProps) => {
  if (posts.length === 0) {
    return <p className="text-gray-400 py-4">No posts available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-750">
              <td className="px-6 py-4">
                <div className="w-24 h-24 bg-gray-700 rounded overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.altText || "Social media post"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(post)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SocialMediaTable;
