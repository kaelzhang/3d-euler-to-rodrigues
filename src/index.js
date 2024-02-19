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
  // [
  //   [- 559.96, 4082.76, 1129.68],
  //   // [- 72.81, 28.88, 38.5]
  // ]
]

nodes.forEach(node => {
  const o = SWITCH(node[0])
  const xyz = node[1]

  const v = ADD(oo, MUL(o, - 1))

  console.log('v', v)

  const vr = ROTATE(
    v,
    xyz
  )

  console.log('vr', vr)

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
