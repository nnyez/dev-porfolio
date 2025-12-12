import { auth, db, googleProvider } from "@/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AppUser, UserBase } from "./types";

interface FirebaseError {
  code: string;
  message: string;
}

export async function registerEmailUser(
  email: string,
  password: string,
  userData: { nombre: string },
) {
  const authEmail = auth;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authEmail,
      email,
      password,
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: userData.nombre,
      role: "standard",
    } as AppUser);

    return userCredential;
  } catch (error) {
    const firebaseError = error as FirebaseError;

    const errorCode = firebaseError.code;
    const errorMessage = firebaseError.message;
    // console.log("Firebase Error Code:", errorCode);
    // console.log("Firebase Error Message:", errorMessage);
    throw new Error(errorCode);
  }
}

import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginEmailUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;

    const errorCode = firebaseError.code;
    const errorMessage = firebaseError.message;
    // console.log("Firebase Error Code:", errorCode);
    // console.log("Firebase Error Message:", errorMessage);
    throw new Error(errorCode);
  }
}
export async function signInWithGoogle() {
  try {
    // 1. Iniciar sesión con Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // 2. Referencia al documento del usuario
    const userRef = doc(db, "users", user.uid);

    // 3. Verificar si el documento YA existe
  const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // CASO 1: Usuario NUEVO -> Lo creamos con rol "standard"
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL, // Es útil guardar la foto
        role: "standard",
      });
    } else {
      // CASO 2: Usuario EXISTENTE -> Solo actualizamos la última conexión
      // Usamos { merge: true } para no tocar el rol ni otros datos
      await setDoc(
        userRef,
        {
          email: user.email, // Actualizamos email por si cambió en Google
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        { merge: true },
      );
    }

    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const errorCode = firebaseError.code;
    // const errorMessage = firebaseError.message;
    console.error("Error en Google Sign-In:", errorCode);
    throw new Error(errorCode);
  }
}
