const deleteImage = require("../../utils/removeImage");
const Cabin = require("./../../models/cabinModel");
const NodeError = require("./../../utils/nodeError");

async function deleteCabin(req, res) {
  const cabin = await Cabin.findByIdAndDelete(req.params.id);

  if (!cabin) {
    throw new NodeError(true, "Cabin not found!!", 404);
  }
  await deleteImage(cabin.cabin_image);

  res.status(204);
  res.json({
    status: "success",
    data: null,
  });
}

module.exports = deleteCabin;
