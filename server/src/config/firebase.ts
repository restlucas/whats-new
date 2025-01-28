import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import path from "path";

// Importa o arquivo JSON de credenciais
const serviceAccount = require(path.resolve(
  __dirname,
  "../../serviceAccountKey.json" // Verifique o caminho correto
));

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "what-s-new-f5a22.firebasestorage.app", // Substitua pelo nome correto do seu bucket
});

export const storage = getStorage().bucket();
