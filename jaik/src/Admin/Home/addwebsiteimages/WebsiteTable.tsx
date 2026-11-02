import type { Website } from "./website";

interface WebsiteTableProps {
  websites: Website[];
  onEdit: (website: Website) => void;
  onDelete: (id: string) => void;
}

const WebsiteTable = ({ websites, onEdit, onDelete }: WebsiteTableProps) => {
  if (websites.length === 0) {
    return <p className="text-gray-400 py-4">No websites available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
              URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {websites.map((website) => (
            <tr key={website.id} className="hover:bg-gray-750">
              <td className="px-6 py-4">
                <div className="w-24 h-16 bg-gray-700 rounded overflow-hidden">
                  <img
                    src={website.imageSrc}
                    alt={website.alt || "Website preview"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300 max-w-xs truncate">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    {website.url}
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(website)}
                  className="text-green-400 hover:text-green-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(website.id)}
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

export default WebsiteTable;
