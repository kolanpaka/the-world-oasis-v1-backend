async function getAccount(req, res) {
  res.status(200);
  res.json({
    status: "success",
    data: {
      user: req.currentUser,
    },
  });
}

module.exports = getAccount;
