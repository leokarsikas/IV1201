import ApplicationForm from "../components/ApplicationForm"; // Adjust the path based on your folder structure

export default function ApplicationPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Apply for a Role</h1>
      <ApplicationForm />
    </div>
  );
}

