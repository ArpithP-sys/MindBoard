import mongoose from "mongoose";    

// 1 - Create a schema
// 2 - Create a model based off that schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    // Optionally, you can associate a userId to each note for filtering (optional for multi-user feature)
    userId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Create the Note model
const Note = mongoose.model("Note", noteSchema);

// Export the Note model
export default Note;
