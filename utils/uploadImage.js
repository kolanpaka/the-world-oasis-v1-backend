const { cloudinary } = require("./../cloudinaryConfig");
const NodeError = require("./nodeError");
async function uploadImage(folder, file) {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
    });
    return result.secure_url;
  } catch (error) {
    throw new NodeError(true, "failed to upload the image", 400);
  }
}

module.exports = uploadImage;
