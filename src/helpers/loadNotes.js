import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) =>{
    const notesSnap = await db.collection(`/${uid}/journal/notes/`).get();
    const notes = [];
    
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    //asi ya tendremos el listado en []
    // console.log(notes);

    return notes;
}