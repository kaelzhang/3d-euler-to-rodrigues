const test = require('ava')
// const log = require('util').debuglog('3d-euler-to-rodrigues')
const {
  ZYX_TO_XYZ
} = require('../src/convert')

const cases = [
  [
    // ZYX
    [- 30, 0, 45], [40.89, 20.70, - 22.21]
  ],
  [
    [39.1, - 28.08, 90.41], [90.46, - 38.91, - 28.37]
  ],
  [
    [- 159.23, - 37.67, 153.43],
    [- 139.16, - 20.64, 142.26]
  ]
]

cases.forEach(([zyx, xyz]) => {
  test(`zyx -> xyz: ${zyx} -> ${xyz}`, t => {
    const result = ZYX_TO_XYZ(...zyx).map(r => Math.round(r * 100) / 100)
    t.deepEqual(result, xyz)
  })
})
