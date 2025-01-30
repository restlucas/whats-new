"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToFirebase = void 0;
const firebase_1 = require("../config/firebase"); // A importação pode variar dependendo da sua configuração
const uploadToFirebase = async (fileBuffer, fileName) => {
    try {
        const bucketFile = firebase_1.storage.file(fileName);
        // Verifica se o arquivo já existe
        const [exists] = await bucketFile.exists();
        if (exists) {
            // Se o arquivo existe, exclui-o
            await bucketFile.delete();
        }
        // Faz o upload do buffer para o Firebase Storage
        await bucketFile.save(fileBuffer, {
            metadata: { contentType: "image/jpeg" }, // Altere conforme necessário
        });
        // Torna o arquivo público
        await bucketFile.makePublic();
        // Retorna a URL pública do arquivo
        return bucketFile.publicUrl();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error on Firebase's image upload: ${error.message}`);
        }
        else {
            throw new Error("Unknown error on upload image to Firebase");
        }
    }
};
exports.uploadToFirebase = uploadToFirebase;
