import Note from "../models/Note.js";

// ✅ Fetch all notes for a specific user
export async function getApiRoutes(req, res) {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getApiRoutes controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// ✅ Fetch a single note for specific user
export async function getSingleNote(req, res) {
    try {
        const { userId } = req.query;  // From URL query param
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getSingleNote controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// ✅ Create a new note with userId
export async function createApiRoutes(req, res) {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ message: "Title, content and userId are required" });
        }

        const note = new Note({ title, content, userId });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createApiRoutes controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// ✅ Update only if userId matches
export async function updateApiRoutes(req, res) {
  try {
    const { title, content, userId } = req.body;

    // Validate required fields
    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Title, content, and userId are required" });
    }

    // Find the existing note
    const existingNote = await Note.findById(req.params.id);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check ownership
    if (existingNote.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this note" });
    }

    // Perform the update
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateApiRoutes controller", error);
    res.status(500).send({ message: "Internal server error" });
  }
}


// ✅ Delete only if userId matches
export async function deleteApiRoutes(req, res) {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    // Validate required field
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Find the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check ownership
    if (note.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this note" });
    }

    // Perform deletion
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteApiRoutes controller", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
