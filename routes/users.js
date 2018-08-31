module.exports = app => {
  app.get("/current_user", (req, res) => {
    res.send("Modify user routes.");
  });
};
