import { Schema, model, models } from "mongoose";

const UserFolderSchema = new Schema({
  folderName: {
    type: String,
  },
  userId: {
    type: String,
  },
  password: {
    type: String,
  },
  projectId: {
    type: Array,
  },
});

const folderModel = models.folder || model("folder", UserFolderSchema);
export default folderModel;
