import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", category: "outpatient" });

  useEffect(() => { fetchPatients(); }, []);

  async function fetchPatients() {
    const snap = await getDocs(collection(db, "patients"));
    setPatients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  async function addPatient(e) {
    e.preventDefault();
    await addDoc(collection(db, "patients"), {
      ...form,
      age: Number(form.age),
      medicalHistory: [],
      paymentHistory: [],
      totalPaid: 0,
      createdAt: serverTimestamp(),
    });
    setForm({ name: "", age: "", category: "outpatient" });
    fetchPatients();
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Patients</h2>
      <form onSubmit={addPatient} className="flex flex-wrap gap-2 mb-4">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-2 bg-slate-800 text-white rounded" />
        <input type="number" placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className="p-2 bg-slate-800 text-white rounded" />
        <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="p-2 bg-slate-800 text-white rounded">
          <option value="outpatient">Outpatient</option>
          <option value="inpatient">Inpatient</option>
        </select>
        <button className="px-4 py-2 bg-indigo-600 rounded">Add</button>
      </form>

      <ul>
        {patients.map(p => (
          <li key={p.id} className="mb-2 p-3 bg-slate-800 rounded flex justify-between">
            <div>
              <strong>{p.name}</strong> ({p.category}) - {p.age} yrs
            </div>
            <Link to={`/dashboard/patients/${p.id}`} className="text-indigo-400 hover:underline">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
