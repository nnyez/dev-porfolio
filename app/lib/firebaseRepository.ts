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
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";
import { AppUser, Project, UserAvailabilityConfig, ServiceApplication } from "./types";
import { db } from "@/firebase.config";
import { catchError, defer, from, map, Observable, of } from "rxjs";

export function getAllUsers(
  uid: string,
  qr?: QueryConstraint,
): Observable<AppUser[]> {
  // Observable que obtiene usuarios en tiempo real desde Firestore
  // Excluye al usuario actual (uid)
  return new Observable<AppUser[]>((observer) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, qr ? qr : where("uid", "!=", uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<unknown>) => {
        const users: AppUser[] = snapshot.docs.map(
          (doc) => doc.data() as AppUser,
        );
        observer.next(users);
      },
      (error: unknown) => {
        observer.error(error);
      },
    );

    // Cleanup para evitar memory leaks
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
  // Observable en tiempo real del perfil del usuario desde Firestore
  return new Observable<AppUser | null>((observer) => {
    const userDocRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot: DocumentSnapshot<unknown>) => {
        if (snapshot.exists()) {
          observer.next(snapshot.data() as AppUser);
        } else {
          observer.next(null);
        }
      },
      (error: unknown) => {
        observer.error(error);
      },
    );
    return () => unsubscribe();
  });
}

// ===== PROYECTOS =====

export function getAllProjects(q?: QueryConstraint): Observable<Project[]> {
  // Obtiene todos los proyectos con filtros opcionales
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
  // Crea un nuevo proyecto en Firestore
  return defer(() => {
    const projectRef = doc(db, "projects", projectData.id);
    // Crea documento con setDoc
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

// ===== SOLICITUDES DE SERVICIO =====

export function addServiceApplication(
  applicationData: ServiceApplication,
): Observable<UpdateResult> {
  // Crea una nueva solicitud de servicio en Firestore
  return defer(() => {
    const appRef = doc(db, "applications", applicationData.id);
    return setDoc(appRef, applicationData);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error adding service application:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function getApplicationsForProgrammer(
  programmerUid: string,
): Observable<ServiceApplication[]> {
  // Obtiene solicitudes dirigidas a un programador específico en tiempo real
  return new Observable<ServiceApplication[]>((observer) => {
    const applicationsCollection = collection(db, "applications");
    const q = query(
      applicationsCollection,
      where("programmerUid", "==", programmerUid),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const applications: ServiceApplication[] = snapshot.docs.map(
          (doc) => doc.data() as ServiceApplication,
        );
        observer.next(applications);
      },
      (error) => {
        observer.error(error);
      },
    );
    return () => unsubscribe();
  });
}

export function getApplicationsFromClient(
  clientUid: string,
): Observable<ServiceApplication[]> {
  // Obtiene solicitudes creadas por un cliente específico en tiempo real
  return new Observable<ServiceApplication[]>((observer) => {
    const applicationsCollection = collection(db, "applications");
    const q = query(
      applicationsCollection,
      where("clientUid", "==", clientUid),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const applications: ServiceApplication[] = snapshot.docs.map(
          (doc) => doc.data() as ServiceApplication,
        );
        observer.next(applications);
      },
      (error) => {
        observer.error(error);
      },
    );
    return () => unsubscribe();
  });
}

export function updateApplicationStatus(
  applicationId: string,
  newStatus: string,
  additionalData?: Partial<ServiceApplication>,
): Observable<UpdateResult> {
  // Actualiza estado de solicitud y datos adicionales (enlace reunión, motivo rechazo, etc)
  return defer(() => {
    const appRef = doc(db, "applications", applicationId);
    const updatePayload: Record<string, unknown> = {
      status: newStatus,
      updatedAt: Date.now(),
      ...additionalData,
    };
    return updateDoc(appRef, updatePayload);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error updating application status:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}

export function deleteServiceApplication(
  applicationId: string,
): Observable<UpdateResult> {
  return defer(() => {
    const appRef = doc(db, "applications", applicationId);
    return deleteDoc(appRef);
  }).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      console.error("Error deleting service application:", error);
      return of({
        success: false,
        message: error.message || "Error desconocido",
      });
    }),
  );
}
