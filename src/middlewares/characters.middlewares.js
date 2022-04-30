const verifyObjectBody = (req, res, next) => {
  if (!req.body.name || !req.body.image) {
    return res
      .status(404)
      .send({ message: "Envie todos os campos preenchidos!" });
  }
  next();
};

export {
    verifyObjectBody,
}