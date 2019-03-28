function CapsPost(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

function CapsPut(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

module.exports = { CapsPost, CapsPut };
