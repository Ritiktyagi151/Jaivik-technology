import type { Video } from "./video";

interface VideoTableProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
}

const VideoTable = ({ videos, onEdit, onDelete }: VideoTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-red-900/50">
        <thead className="bg-red-900/20">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Poster
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Video URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-red-900/50">
          {videos.map((video) => (
            <tr
              key={video.id}
              className="hover:bg-red-900/10 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={video.poster}
                  alt="Poster"
                  className="h-16 w-16 object-cover rounded border border-red-900/50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150";
                  }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300 max-w-xs truncate hover:text-clip">
                  {video.src}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(video)}
                    className="inline-flex items-center px-3 py-1.5 border border-blue-500 rounded-md text-blue-400 bg-blue-900/20 hover:bg-blue-900/30 hover:text-blue-300 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        video.id &&
                        confirm("Are you sure you want to delete this video?")
                      ) {
                        onDelete(video.id);
                      }
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-red-500 rounded-md text-red-400 bg-red-900/20 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
