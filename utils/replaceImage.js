const uploadImage = require("./uploadImage");
const removeImage = require("./removeImage");

async function replaceImage(file, folder, URL) {
  await removeImage(URL);
  const imagePath = await uploadImage(folder, file);
  return imagePath;
}

module.exports = replaceImage;
