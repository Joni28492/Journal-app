import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dmetx6xye', 
    api_key: '194165613242298', 
    api_secret: 'yEP6KwFhw314bVUh2WHNT46O9HY' 
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL ', async() => {
        //img de google
        const resp = await fetch('https://cdna.artstation.com/p/assets/images/images/006/458/524/large/joni-fernandez-03.jpg?1498739545')
        const blob = await resp.blob();//retorna una promise

        const file = new File([blob], 'foto.png');
        //importamos el fileupload
        const url = await fileUpload(file);//lo sube a cloudinary
        //OJO las sube en duplicado
        expect(typeof url).toBe('string');

        //borrar imagen por id
        const segments = url.split('/');
        console.log(segments);//revisamos la extension .jpg o.png
        const imageId= segments[segments.length - 1].replace('.jpg', '');
        console.log(imageId);
        // cloudinary.v2.api.delete_resources(public_ids, options, callback);
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            //done();//pasamos el done como arg al test//no furrula
        });
    });

    test('debe de retornar un error ', async() => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect( url).toBe(null);
    });
    
})
