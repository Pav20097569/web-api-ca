import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    biography: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // Reference to movies the actor acted in
  },
  {
    timestamps: true
  }
);

const Actor = mongoose.model('Actor', actorSchema);

export default Actor;
