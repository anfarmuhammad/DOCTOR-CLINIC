import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => { fetchPatient(); }, [id]);

  async function fetchPatient() {
    const snap = await getDoc(doc(db, "patients", id));
    if (snap.exists()) setPatient({ id: snap.id, ...snap.data() });
  }

  async function addNote() {
    if (!note.trim()) return;
    await updateDoc(doc(db, "patients", id), {
      medicalHistory: arrayUnion({ date: new Date().toISOString().split("T")[0], note }),
    });
    setNote("");
    fetchPatient();
  }

  async function addPayment() {
    const amt = Number(payment);
    if (!amt) return;
    await updateDoc(doc(db, "patients", id), {
      paymentHistory: arrayUnion({ date: new Date().toISOString().split("T")[0], amount: amt }),
      totalPaid: (patient.totalPaid || 0) + amt,
    });
    setPayment("");
    fetchPatient();
  }

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl mb-2">{patient.name}</h2>
      <div className="text-sm mb-4 text-gray-400">
        {patient.category} | Age: {patient.age}
      </div>

      <div className="mb-6">
        <h3 className="text-lg mb-2">Medical History</h3>
        <ul className="mb-2">
          {patient.medicalHistory?.map((h, i) => (
            <li key={i} className="p-2 bg-slate-800 rounded mb-1">
              {h.date}: {h.note}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            placeholder="Add medical note"
            value={note}
            onChange={e=>setNote(e.target.value)}
            className="p-2 bg-slate-800 text-white rounded flex-1"
          />
          <button onClick={addNote} className="bg-indigo-600 px-3 py-1 rounded">Add</button>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-2">Payment History</h3>
        <ul className="mb-2">
          {patient.paymentHistory?.map((p, i) => (
            <li key={i} className="p-2 bg-slate-800 rounded mb-1">
              {p.date}: ₹{p.amount}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Add payment amount"
            value={payment}
            onChange={e=>setPayment(e.target.value)}
            className="p-2 bg-slate-800 text-white rounded flex-1"
          />
          <button onClick={addPayment} className="bg-green-600 px-3 py-1 rounded">Add</button>
        </div>
        <div className="text-lg">Total Paid: ₹{patient.totalPaid || 0}</div>
      </div>
    </div>
  );
}
