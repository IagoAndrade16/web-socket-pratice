import mongoose, { Document, Schema} from "mongoose"

type User = Document & {
  email: string;
  socketId: string;
  name: string;
  avatar: string;
}

const UsersSchema = new Schema({
  email: String,
  socketId: String,
  name: String,
  avatar: String,
})

const User = mongoose.model<User>("Users", UsersSchema);

export { User }