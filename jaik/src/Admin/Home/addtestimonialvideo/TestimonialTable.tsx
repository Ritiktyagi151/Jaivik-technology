import type { Testimonial } from "./testimonial";

interface TestimonialTableProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

const TestimonialTable = ({
  testimonials,
  onEdit,
  onDelete,
}: TestimonialTableProps) => {
  if (testimonials.length === 0) {
    return <p className="text-gray-400 py-4">No testimonials available</p>;
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
              Video URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id} className="hover:bg-gray-750">
              <td className="px-6 py-4">
                <div className="w-32 h-20 bg-gray-700 rounded overflow-hidden">
                  <video
                    src={testimonial.video}
                    poster={testimonial.poster}
                    className="w-full h-full object-cover"
                    muted
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300 max-w-xs truncate">
                  {testimonial.video}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(testimonial)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(testimonial.id)}
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

export default TestimonialTable;
