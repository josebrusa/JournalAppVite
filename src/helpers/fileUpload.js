export const fileUpload = async (file) => {
    if (!file) throw new Error("No selecciono ningun archivo");

    const cloudUrl = "https://api.cloudinary.com/v1_1/react-app-journal/upload";

    const formData = new FormData();
    formData.append("upload_preset", "journal-app");
    formData.append("file", file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData,
        });

        if (!resp.ok) throw new Error("no logro subir archivo");
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
