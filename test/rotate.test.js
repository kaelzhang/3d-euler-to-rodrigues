const test = require('ava')
// const log = require('util').debuglog('3d-euler-to-rodrigues')
const {
  ROTATE
} = require('../src/rotate')

const cases = [
  [
    // original coor
    [- 300, 5, - 5],
    [40.89, 0, 0],
    [- 300, 7.05, - 0.51]
  ],
  [
    // original coor
    [- 300, 5, - 5],
    [40.89, 20.70, 0],
    [- 280.81, 7.05, 105.57]
  ],
  [
    // original coor
    [- 300, 5, - 5],
    [40.89, 20.70, - 22.21],
    [- 257.31, 112.68, 105.57]
  ]
]

cases.forEach(([v, xyz, vr]) => {
  test(`rotate: ${v} -> ${xyz} -> ${vr}`, t => {
    const result = ROTATE(v, xyz).map(r => Math.round(r * 100) / 100)
    console.log(result)
    t.deepEqual(result, vr)
  })
})
