import TestimonialDashboard from "./TestimonialDashboard";

const DashboardPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Testimonials Dashboard</h1>
        <TestimonialDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
