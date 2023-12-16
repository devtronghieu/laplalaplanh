import {
    getFirestore,
    collection,
    doc,
    getDoc,
    query,
    orderBy,
    limit as FirestoreLimit,
    where,
    onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "./setup";

const db = getFirestore(firebaseApp);

export interface FirestoreUser {
    devices: string[];
}

export const getUser = async (email: string) => {
    const userRef = doc(db, "Users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as FirestoreUser;
    } else {
        return null;
    }
};

export interface StatusLog {
    temperature: number;
    epochTime: number;
}

export const watchStatusLogsByEpochTime = async (
    device: string,
    toEpochTime: number,
    callback: (data: StatusLog[]) => void,
    limit: number = 5
) => {
    const statusLogsRef = collection(db, "Devices", device, "StatusLogs");

    const q = query(
        statusLogsRef,
        where("epochTime", "<=", toEpochTime),
        orderBy("epochTime", "desc"),
        FirestoreLimit(limit)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: StatusLog[] = [];

        querySnapshot.forEach((doc) => {
            data.unshift(doc.data() as StatusLog);
        });

        if (callback) {
            callback(data);
        }
    });

    return unsubscribe;
};
