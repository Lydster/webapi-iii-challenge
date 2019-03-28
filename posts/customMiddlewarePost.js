function CapsPost(req, res, next) {
  req.body.text = req.body.text.toUpperCase();
  next();
}

function CapsPut(req, res, next) {
  req.body.text = req.body.text.toUpperCase();
  next();
}

module.exports = { CapsPost, CapsPut };
