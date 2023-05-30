import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import { Product } from "../types/products";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword,setPersistence, browserSessionPersistence,} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const saveProductInDB = async (product: Product) => {
    try {
        const productWithDate = {
            ...product,
            date: new Date().toISOString() 
        };

        await addDoc(collection(db, "products"), productWithDate);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const getProductsFromDB = async (): Promise<Product[]> => {
    const resp: Product[] = [];
    const q = query(collection(db, "products"), orderBy("date", "desc")); // Ordenar por "date" en orden descendente
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        resp.push({
            ...doc.data(),
        } as Product);
    });
    return resp;
};

const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };
  
export {auth}
export default { saveProductInDB, getProductsFromDB, loginUser };


