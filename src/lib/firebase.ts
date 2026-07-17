"use client";

import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import {
  addDoc,
  collection,
  getCountFromServer,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import type { WaitlistFormValues } from "./validations";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

// Firebase must only ever be initialized once, and only in the browser —
// initializing it during server-side rendering (or twice, on fast-refresh)
// throws. Guarding on `typeof window` and `getApps().length` covers both.
const app =
  typeof window !== "undefined" && isFirebaseConfigured()
    ? getApps().length
      ? getApps()[0]!
      : initializeApp(firebaseConfig)
    : undefined;

const db = app ? getFirestore(app) : undefined;

const WAITLIST_COLLECTION = "waitlist";

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Firebase isn't configured yet. Add your project's config to .env.local (see .env.local.example)."
    );
    this.name = "FirebaseNotConfiguredError";
  }
}

/** Writes a single waitlist signup to the `waitlist` collection in Firestore. */
export async function addWaitlistEntry(values: WaitlistFormValues) {
  if (!db) throw new FirebaseNotConfiguredError();

  await addDoc(collection(db, WAITLIST_COLLECTION), {
    name: values.name,
    email: values.email,
    goal: values.goal,
    platform: values.platform,
    updates: values.updates,
    createdAt: serverTimestamp(),
  });
}

/** Reads the total number of documents in the `waitlist` collection. */
export async function getWaitlistCount(): Promise<number> {
  if (!db) throw new FirebaseNotConfiguredError();

  const snapshot = await getCountFromServer(collection(db, WAITLIST_COLLECTION));
  return snapshot.data().count;
}

export { isFirebaseConfigured };
