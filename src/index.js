const {
  ROTATE,
  ADD,
  MUL,
  REVERSE
} = require('./rotate')

const {
  ZYX_TO_XYZ
} = require('./convert')

const COOR_ALPHA = [1, 1, -1]
const ROTATE_ALPHA = [1, -1, 1]

const SWITCH = c => MUL(c, COOR_ALPHA)

const oo = [0, 0, 0]

const nodes = [
  [
    // origin
    [0, 3100, 0],
    // rotation
    [-45, 0, 30]
  ],
  [
    [-559.96, 4082.76, 1129.68],
    [-72.81, 28.88, 38.5]
  ]
]

nodes.forEach(node => {
  const o = SWITCH(node[0])
  const r = MUL(node[1], -1)

  const xyz = ZYX_TO_XYZ(...REVERSE(r, true))

  const vo = ROTATE(
    ADD(oo, MUL(o, - 1)),
    r,
    true,
    true
  )

  // console.log(ADD(oo, MUL(o, - 1)), xyz)

  // const vo = ROTATE(
  //   ADD(oo, MUL(o, - 1)),
  //   xyz
  // )

  console.log(
    SWITCH(vo),
    MUL(SWITCH(vo), 2),
    MUL(xyz, ROTATE_ALPHA)
  )
})
