const {
  UNIT_VECTORS,
  ROTATE,
  DOT
} = require('./rotate')

const get_unit_vectors = (...r) => [
  ROTATE(UNIT_VECTORS[0], r),
  ROTATE(UNIT_VECTORS[1], r),
  ROTATE(UNIT_VECTORS[2], r)
]

// Change a vector from the global coordinate system
//   to the local coordinate system
const GLOBAL_VECTOR_TO_LOCAL = (v, rotate) => {
  const unit_vectors = get_unit_vectors(...rotate)

  return [
    DOT(v, unit_vectors[0]),
    DOT(v, unit_vectors[1]),
    DOT(v, unit_vectors[2])
  ]
}

module.exports = {
  GLOBAL_VECTOR_TO_LOCAL
}
