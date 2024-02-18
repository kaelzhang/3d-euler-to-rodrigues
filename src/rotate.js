// Cross product: k X v
const CROSS = (k, v) => [
  k[1] * v[2] - k[2] * v[1],
  k[2] * v[0] - k[0] * v[2],
  k[0] * v[1] - k[1] * v[0]
]

const SUM = arr => arr.reduce((a, b) => a + b, 0)

// Dot product: k . v
const DOT = (k, v) => k[0] * v[0] + k[1] * v[1] + k[2] * v[2]

// Multiply vector by a scalar or multiply two vectors
const MUL = exports.MUL = (arr, m) => Array.isArray(m)
  ? arr.map((c, i) => c * m[i])
  : arr.map(c => c * m)

const ADD = exports.ADD = (first, ...args) => args.reduce(
  ([x, y, z], current) => [
    x + current[0],
    y + current[1],
    z + current[2]
  ],
  first
)

const COS = exports.COS = r => Math.cos(Math.PI * r / 180)

const SIN = exports.SIN = r => Math.sin(Math.PI * r / 180)

// const MINUS_ONE = [- 1, - 1, - 1]

const REVERSE = exports.REVERSE = (vector, reverse) => reverse
  ? [].concat(vector).reverse()
  : vector

// Rotate a vector `v` around an axis `k` by `r` degrees
// according to Rodrigues' rotation formula
// ref: https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
const ROD_ROTATE = exports.ROD_ROTATE = (v, k, r) => {
  const a1 = MUL(
    v,
    COS(r)
  )

  const a2 = MUL(
    CROSS(k, v),
    SIN(r)
  )

  const a3 = MUL(
    MUL(
      k,
      DOT(k, v)
    ),
    (1 - COS(r))
  )

  return ADD(a1, a2, a3)
}

const UNIT_VECTORS = exports.UNIT_VECTORS = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]

// Apply a rotation `r` around x, y and z to the givin vector `v` to get the
//   new vector
// - extrinsic `boolean` whether to rotate around the global coordinate system
//     or the local coordinate system sodility to the rigid body
// - reverse `boolean` whether to reverse the rotation order, false to apply a
//     x-y-z rotation, true to apply a z-y-x rotation
const ROTATE = exports.ROTATE = (v, r, extrinsic = true, reverse = false) => {
  const [rx, ry, rz] = REVERSE(r, reverse)
  const [kx, ky_, kz_] = REVERSE(UNIT_VECTORS, reverse)

  const ky = extrinsic
    ? ky_
  // ky after rotating around x axis
    : ROD_ROTATE(ky_, kx, rx)

  const kz = extrinsic
    ? kz_
  // kz after rotating around x and y axis
    : ROD_ROTATE(
      // kz after rotating around x axis
      ROD_ROTATE(kz_, kx, rx),
      ky,
      ry
    )

  return ROD_ROTATE(
    ROD_ROTATE(
      ROD_ROTATE(
        v,
        kx,
        rx
      ),
      ky,
      ry
    ),
    kz,
    rz
  )
}

module.exports = {
  CROSS,
  SUM,
  DOT,
  MUL,
  ADD,
  COS,
  SIN,
  // MINUS_ONE,
  REVERSE,
  ROD_ROTATE,
  // UNIT_VECTORS,
  ROTATE
}
