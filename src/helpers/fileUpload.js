


export const fileUpload = async ( file ) =>{
    //utilizamos el url que usamos en postman
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dmetx6xye/upload'
    //creamos el form-data
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    //esto es probable que falle asi que tryCatch
    try {//fetch por defecto es GET pero utilizamos el 
        //seg arg 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            // throw await resp.json();
            return null;
        }

    } catch (err) {
        throw err
    }
    //return url imagen
}