const Cabin = require("./../../models/cabinModel");
const NodeError = require("./../../utils/nodeError");

// URL : /cabins/:id

async function getCabin(req, res) {
  const { id } = req.params;
  const cabin = await Cabin.findById(id);
  if (!cabin) {
    throw new NodeError(true, "Cabin not found!!", 404);
  }
  res.status(200);
  res.json({
    status: "success",
    data: {
      cabin,
    },
  });
}

module.exports = getCabin;
