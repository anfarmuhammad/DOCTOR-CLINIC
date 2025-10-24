import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialization: "", phone: "", email: "" });

  useEffect(() => { fetchDoctors(); }, []);

  async function fetchDoctors() {
    const snap = await getDocs(collection(db, "doctors"));
    setDoctors(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  async function addDoctor(e) {
    e.preventDefault();
    await addDoc(collection(db, "doctors"), {
      ...form,
      createdAt: serverTimestamp()
    });
    setForm({ name: "", specialization: "", phone: "", email: "" });
    fetchDoctors();
  }

  async function removeDoctor(id) {
    await deleteDoc(doc(db, "doctors", id));
    fetchDoctors();
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Doctors</h2>
      <form onSubmit={addDoctor} className="mb-4 flex flex-wrap gap-2">
        {["name", "specialization", "phone", "email"].map(f => (
          <input
            key={f}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            className="p-2 bg-slate-800 rounded text-white"
          />
        ))}
        <button className="px-4 py-2 bg-indigo-600 rounded">Add</button>
      </form>

      <ul>
        {doctors.map(d => (
          <li key={d.id} className="mb-2 p-3 bg-slate-800 rounded flex justify-between">
            <div>
              <strong>{d.name}</strong> — {d.specialization}
              <div className="text-sm text-gray-400">{d.phone} | {d.email}</div>
            </div>
            <button onClick={() => removeDoctor(d.id)} className="bg-red-600 px-2 rounded">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
