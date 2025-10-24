import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Doctors from "../Sections/Doctors";
import Patients from "../Sections/Patients";
import PatientDetails from "../Sections/PatientDetails";

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-4 bg-slate-900 text-white">
        <h3 className="text-xl mb-2">Clinic Dashboard</h3>
        <div className="mb-4">{user?.name} ({user?.role})</div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/doctors">Doctors</Link>
          <Link to="/dashboard/patients">Patients</Link>
        </nav>
        <button
          onClick={logout}
          className="mt-6 py-2 w-full bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 bg-[#071024] text-white">
        <Routes>
          <Route index element={<div>Welcome to Dashboard</div>} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetails />} />
        </Routes>
      </main>
    </div>
  );
}
