const {
  SIN,
  COS
} = require('./rotate')

// Pay attention about the matrices here
// Since [x, y, z] here (in JavaScript) represents the vector:
// |---|
//   x
//   y
//   z
// |---|

// Get the x-y-z rotation matrix from the given x, y and z rotations
const XYZ_TO_MATRIX = (rx, ry, rz) => [
  [
    COS(ry) * COS(rz),
    SIN(rx) * SIN(ry) * COS(rz) - COS(rx) * SIN(rz),
    COS(rx) * SIN(ry) * COS(rz) + SIN(rx) * SIN(rz)
  ],
  [
    COS(ry) * SIN(rz),
    SIN(rx) * SIN(ry) * SIN(rz) + COS(rx) * COS(rz),
    COS(rx) * SIN(ry) * SIN(rz) - SIN(rx) * COS(rz)
  ],
  [
    - SIN(ry),
    SIN(rx) * COS(ry),
    COS(rx) * COS(ry)
  ]
]

// Get the z-y-x rotation matrix from the given x, y and z rotations
const ZYX_TO_MATRIX = (rz, ry, rx) => [
  [
    COS(ry) * COS(rz),
    - COS(ry) * SIN(rz),
    SIN(ry)
  ],
  [
    COS(rx) * SIN(rz) + SIN(rx) * SIN(ry) * COS(rz),
    COS(rx) * COS(rz) - SIN(rx) * SIN(ry) * SIN(rz),
    - SIN(rx) * COS(ry)
  ],
  [
    SIN(rx) * SIN(rz) - COS(rx) * SIN(ry) * COS(rz),
    SIN(rx) * COS(rz) + COS(rx) * SIN(ry) * SIN(rz),
    COS(rx) * COS(ry)
  ]
]

// Get the z-y-x rotations in degrees from the given rotation matrix
const MATRIX_TO_XYZ = matrix => {
  let ry = Math.asin(- matrix[2][0])
  const cos_ry = Math.cos(ry)

  let rx = Math.atan2(matrix[2][1] / cos_ry, matrix[2][2] / cos_ry)
  let rz = Math.atan2(matrix[1][0] / cos_ry, matrix[0][0] / cos_ry)

  rx *= (180 / Math.PI)
  ry *= (180 / Math.PI)
  rz *= (180 / Math.PI)

  return [rx, ry, rz]
}

const MATRIX_TO_ZYX = matrix => {
  let ry = Math.asin(- matrix[2][0])
  const cos_ry = Math.cos(ry)

  let rx = Math.atan2(- matrix[1][2] / cos_ry, matrix[2][2] / cos_ry)
  let rz = Math.atan2(- matrix[0][1] / cos_ry, matrix[0][0] / cos_ry)

  rx *= (180 / Math.PI)
  ry *= (180 / Math.PI)
  rz *= (180 / Math.PI)

  return [rz, ry, rx]
}

const ZYX_TO_XYZ = (rz, ry, rx) => {
  const matrix = ZYX_TO_MATRIX(rz, ry, rx)
  return MATRIX_TO_XYZ(matrix)
}

const XYZ_TO_ZYX = (rx, ry, rz) => {
  const matrix = XYZ_TO_MATRIX(rx, ry, rz)
  return MATRIX_TO_ZYX(matrix)
}

module.exports = {
  ZYX_TO_MATRIX,
  XYZ_TO_MATRIX,
  MATRIX_TO_XYZ,
  MATRIX_TO_ZYX,
  ZYX_TO_XYZ,
  XYZ_TO_ZYX
}
