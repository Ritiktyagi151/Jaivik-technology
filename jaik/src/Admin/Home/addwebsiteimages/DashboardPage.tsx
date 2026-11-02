import WebsiteDashboard from "./WebsiteDashboard";

const DashboardPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Websites Dashboard</h1>
        <WebsiteDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
