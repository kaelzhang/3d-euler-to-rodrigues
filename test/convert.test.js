const test = require('ava')
// const log = require('util').debuglog('3d-euler-to-rodrigues')
const {
  ZYX_TO_XYZ
} = require('../src/convert')

const cases = [
  [
    // ZYX
    [- 30, 0, 45], [40.89, 20.70, - 22.21]
  ]
]

cases.forEach(([zyx, xyz]) => {
  test(`${zyx} -> ${xyz}`, t => {
    const result = ZYX_TO_XYZ(...zyx).map(r => Math.round(r * 100) / 100)
    t.deepEqual(result, xyz)
  })
})
