

exports.send404Error = (req, res, next) => {
  
  res.status(404).send({ msg: 'Not Found'})
}

// exports.methNotFound = (req, res, next) => {
//  res.status(405).send({ msg: 'Method Not Found'})
// }