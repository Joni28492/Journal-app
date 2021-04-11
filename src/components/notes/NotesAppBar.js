import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const {active} = useSelector(state => state.notes)
    const dispatch = useDispatch()

    const handleSave = () =>{
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () =>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        //controlamos el cancel
        if (file) {
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>30 Marzo 2021</span>

            <input type="file" style={{display: 'none'}} 
                onChange={handleFileChange} id='fileSelector'
                name="file"
            />

            <div>
                <button className="btn" onClick={handlePictureClick} >Picture</button>
                <button className="btn" onClick={handleSave}>save</button>
            </div>
        </div>
    )
}
