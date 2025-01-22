// x offset: 53.53
// z offset: 4681.03

const { GLOBAL_VECTOR_TO_LOCAL } = require("../src/coor")

// y rotate: -13.96
// z rotate: -90

// x scale: 17
// y scale: 57.5
// z scale: 0.3

const expected_moves = [
  [
    // move
    [0, -3000, - 2000],
    // init scale
    [17, 57.5, 0.3],
    // init rotate
    [0, -13.96, -90]
  ],
  [
    [0, -1800, - 1200],
    [.2, .2, 6],
    [0, 76.4, -90]
  ],
  [
    [3000, - 3000, - 2000],
    [1, 28, 1],
    [-9.98, 0, 45]
  ],
  [
    [0, 0, - 2000],
    [66, 2, 1],
    [0, 0, 0]
  ],
  [
    [0, -1350, -900],
    [0.5, 78.1, 1.6],
    [0, 0, -90]
  ],
  [
    [0, -1350, -900],
    [0.5, 9, .8],
    [0, 0, 0]
  ],
  [
    [0, -900, -600],
    [0.5, 7.45, .8],
    [0, 0, 0]
  ],
  [
    [0, -450, -300],
    [0.5, 4.8, .8],
    [0, 0, 0]
  ],
  [
    [1350, -1350, -900],
    [0.5, 9.49, 1.1],
    [0, 0, 45]
  ],
  [
    [900, -900, -600],
    [0.5, 10.7, 1.1],
    [0, 0, 45]
  ],
  [
    [450, -450, -300],
    [0.5, 7.2, 1.1],
    [0, 0, 45]
  ]
]


expected_moves.forEach(([
  expected,
  scale,
  rotate
]) => {
  const move1 = GLOBAL_VECTOR_TO_LOCAL(expected, rotate)
  const offset = [
    move1[0] / scale[0],
    move1[1] / scale[1],
    move1[2] / scale[2]
  ]

  console.log(offset.map(x => Math.round(x * 100) / 100))
})
