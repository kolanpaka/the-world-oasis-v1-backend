const { cloudinary } = require("./../cloudinaryConfig");
async function removeImage(URL) {
  const splitter = URL.split("/");
  const publicId = `${splitter.at(-2)}/${splitter.at(-1).split(".").at(0)}`;
  if (!publicId.includes("default-user"))
    await cloudinary.uploader.destroy(publicId);
}

module.exports = removeImage;
