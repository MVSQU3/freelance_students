import { useState } from "react";

export default function TestRoute() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("uploads") // nom du bucket
      .upload(`files/${Date.now()}-${file.name}`, file);

    if (error) {
      console.error("Erreur upload :", error);
    } else {
      // Récupérer l’URL publique
      const { data: publicUrl } = supabase.storage
        .from("uploads")
        .getPublicUrl(data.path);

      setUrl(publicUrl.publicUrl);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Uploader</button>
      {url && (
        <p>
          Fichier dispo ici :{" "}
          <a href={url} target="_blank">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
