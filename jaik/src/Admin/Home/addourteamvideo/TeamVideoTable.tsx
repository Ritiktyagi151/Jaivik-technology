import type { TeamVideo } from "./teamVideo";

interface TeamVideoTableProps {
  videos: TeamVideo[];
  onEdit: (video: TeamVideo) => void;
  onDelete: (id: string) => void;
}

const TeamVideoTable = ({ videos, onEdit, onDelete }: TeamVideoTableProps) => {
  if (videos.length === 0) {
    return <p className="text-gray-400 py-4">No team videos available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-750">
              <td className="px-6 py-4">
                <div className="w-24 h-16 bg-gray-700 rounded overflow-hidden relative">
                  <video
                    src={video.video}
                    poster={video.poster}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-6 h-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  {video.name && (
                    <div className="font-medium">{video.name}</div>
                  )}
                  {video.position && (
                    <div className="text-gray-300">{video.position}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(video)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(video.id)}
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

export default TeamVideoTable;
