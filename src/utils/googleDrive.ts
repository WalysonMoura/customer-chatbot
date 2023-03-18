/*
import { drive_v3 } from "googleapis";

export async function getGoogleDriveFile(fileId: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "path/to/your/keyfile.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = drive_v3({ auth });

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return res.data;
}

/*
  
  Essa função usa a biblioteca do Google Drive para autenticar com a API e obter o arquivo 
  com base no ID fornecido. 
  O parâmetro responseType: 'stream' é adicionado para obter a resposta como um fluxo.
  */
