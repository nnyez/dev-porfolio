import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppUser, Project, UserAvailabilityConfig } from "./types"; // Tus tipos
import { db } from "@/firebase.config";
import { catchError, defer, from, map, Observable, of } from "rxjs";

export function getAllUsers(
  uid: string,
  qr?: QueryConstraint,
): Observable<AppUser[]> {
  return new Observable<AppUser[]>((observer) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, qr ? qr : where("uid", "!=", uid));
    console.log("Query constraints:", q);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const users: AppUser[] = snapshot.docs.map(
          (doc) => doc.data() as AppUser,
        );
        observer.next(users);
      },
      (error) => {
        observer.error(error);
      },
    );

    // Cleanup function
    return () => unsubscribe();
  });
}

export interface UpdateResult {
  success: boolean;
  message?: string;
}
export function updateUserRole(
  uid: string,
  newRole: string,
): Observable<UpdateResult> {
  const userRef = doc(db, "users", uid);

  return from(updateDoc(userRef, { role: newRole })).pipe(
    map(() => ({ success: true })),

    catchError((error) => {
      console.error("Error RxJS:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function updateUserData(
  uid: string,
  updatedData: Partial<AppUser>,
): Observable<UpdateResult> {
  const userRef = doc(db, "users", uid);
  return from(updateDoc(userRef, updatedData)).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error updating user data:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function deleteUser(uid: string): Observable<UpdateResult> {
  const userRef = doc(db, "users", uid);
  return from(deleteDoc(userRef)).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error deleting user:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function addSchedule(
  data: UserAvailabilityConfig,
): Observable<UpdateResult> {
  const scheduleRef = doc(db, "schedules", data.uid);
  return from(setDoc(scheduleRef, data)).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error adding schedule:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function getUserData(uid: string): Observable<AppUser | null> {
  return new Observable<AppUser | null>((observer) => {
    const userDocRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          observer.next(snapshot.data() as AppUser);
        } else {
          observer.next(null);
        }
      },
      (error) => {
        observer.error(error);
      },
    );
    return () => unsubscribe();
  });
}
//===========================================
//  PROYECTOS

export function getAllProjects(q?: QueryConstraint): Observable<Project[]> {
  return new Observable<Project[]>((observer) => {
    const projectsCollection = collection(db, "projects");
    const queryConstraints = q
      ? query(projectsCollection, q)
      : projectsCollection;
    const unsubscribe = onSnapshot(
      queryConstraints,
      (snapshot) => {
        const projects: Project[] = snapshot.docs.map(
          (doc) => doc.data() as Project,
        );
        observer.next(projects);
      },
      (error) => {
        observer.error(error);
      },
    );
    return () => unsubscribe();
  });
}

export function addProject(projectData: Project): Observable<UpdateResult> {
  return defer(() => {
    const projectRef = doc(db, "projects", projectData.id);

    // Guardamos usando setDoc
    return setDoc(projectRef, projectData);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error adding project:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function updateProject(
  projectId: string,
  updatedData: Partial<Project>,
): Observable<UpdateResult> {
  return defer(() => {
    const projectRef = doc(db, "projects", projectId);
    return updateDoc(projectRef, updatedData);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error updating project:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function deleteProject(projectId: string): Observable<UpdateResult> {
  return defer(() => {
    const projectRef = doc(db, "projects", projectId);
    return deleteDoc(projectRef);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error deleting project:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}
