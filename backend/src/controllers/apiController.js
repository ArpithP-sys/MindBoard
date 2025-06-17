import Note from "../models/Note.js"
export async function getApiRoutes(req,res) {
    try{
        const notes=await Note.find().sort({createdAt:-1}); // Fetch all notes from the database
        //-1 will sort in descending order
        res.status(200).json(notes); // Send the notes as a JSON response
    }catch(error){
        console.error("Error in getApiroutes controller",error);
        res.status(500).send({message:"Internal server error"});
     }
}
    
export async function getSingleNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getSingleNote controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export async function createApiRoutes(req,res){
    try{
        const{title,content}=req.body
        const note=new Note({title:title, content:content})

        const savedNote=await note.save(); // Save the new note to the database
        res.status(201).json(savedNote); // Send the created note as a JSON response
    }catch(error){
        console.error("Error in createApiRoutes controller",error);
        res.status(500).send({message:"Internal server error"});
    }
}
export async function updateApiRoutes(req,res){
    try{
        const{title,content}=req.body
        await Note.findByIdAndUpdate(
            req.params.id, // Get the note ID from the request parameters
            {title:title, content:content}, // Update the note with new title and content
            {new:true} // Return the updated note
    );
    if(!updateApiRoutes){
        return res.status(404).json({message:"Note not found"}); // If the note is not found, send a 404 response
    }
    res.status(200).json(updateApiRoutes); // Send a success message
    }catch(error){
        console.error("Error in updateApiRoutes controller",error);
        res.status(500).send({message:"Internal server error"});
    }
}
export async function deleteApiRoutes(req,res){
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id); // Delete the note by ID
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"}); // If the note is not found, send a 404 response
        }
        res.status(200).json({message:"Note deleted successfully"}); // Send a success message
    }catch(error){
         console.error("Error in deleteApiroutes controller",error);
         res.status(500).send({message:"Internal server error"});
    }
}