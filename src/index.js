const {
  ROTATE,
  ADD,
  MUL,
  REVERSE
} = require('./rotate')

const {
  ZYX_TO_XYZ
} = require('./convert')

const COOR_ALPHA = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, - 1]
]
// const ROTATE_ALPHA = [1, - 1, 1]

const SWITCH = c => MUL(COOR_ALPHA, c)

const oo = [0, 0, 0]

const nodes = [
  [
    // origin
    [0, 3100, 0],
    // XYZ rotation to roll the position back
    // [- 45, 0, 30]
    [40.89, 20.70, - 22.21]

  ],
  [
    [- 749.68, 15797.78, 781.30],
    // [- 72.81, 28.88, 38.5]
  ]
]

const OFFSET_SCALE = 1

nodes.forEach(node => {
  const o = SWITCH(node[0])
  const xyz = node[1]

  const v = ADD(oo, MUL(o, - 1))

  const vr = MUL(
    ROTATE(v, xyz),
    OFFSET_SCALE
  )

  // console.log(ADD(oo, MUL(o, - 1)), xyz)

  // const vo = ROTATE(
  //   ADD(oo, MUL(o, - 1)),
  //   xyz
  // )

  console.log(
    SWITCH(vr),
    // MUL(SWITCH(vo), 2),
    // MUL(xyz, ROTATE_ALPHA)
  )
})
