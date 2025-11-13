async function cleanup(server, dbConnection) {
  await dbConnection.close();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
}

module.exports = cleanup;
