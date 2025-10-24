import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import bcrypt from "bcryptjs";

export async function loginWithEmail(email, password) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return { error: "User not found" };

    let userDoc = null;
    snapshot.forEach((doc) => (userDoc = { id: doc.id, ...doc.data() }));

    let match = false;
    if (userDoc.passwordHash) match = bcrypt.compareSync(password, userDoc.passwordHash);
    else if (userDoc.password) match = password === userDoc.password;

    if (!match) return { error: "Invalid password" };

    delete userDoc.passwordHash;
    delete userDoc.password;

    return { user: userDoc };
  } catch (err) {
    console.error(err);
    return { error: "Login failed" };
  }
}
