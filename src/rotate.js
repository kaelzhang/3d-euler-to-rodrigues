// Cross product: k X v
const CROSS = (k, v) => [
    k[1] * v[2] - k[2] * v[1],
    k[2] * v[0] - k[0] * v[2],
    k[0] * v[1] - k[1] * v[0]
]

// Dot product: k . v
const DOT = (k, v) => k[0] * v[0] + k[1] * v[1] + k[2] * v[2]

// Multiply vector by a scalar or multiply two vectors
const MUL = (arr, m) => Array.isArray(m)
    ? arr.map((c, i) => c * m[i])
    : arr.map(c => c * m)

const ADD = (first, ...args) => args.reduce(
  ([x, y, z], current) => [
    x + current[0],
    y + current[1],
    z + current[2]
  ],
  first
)

const COS = r => Math.cos(Math.PI * r / 180)

const SIN = r => Math.sin(Math.PI * r / 180)

const MINUS_ONE = [-1, -1, -1]

const reverse_vectors = (vector, reverse) => reverse
    ? [].concat(vector).reverse()
    : vector

// Rotate a vector `v` around an axis `k` by `r` degrees
// according to Rodrigues' rotation formula
// ref: https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
const ROD_ROTATE = (v, k, r) => {
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

const UNIT_VECTORS = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]

// Add a function to Euler's rotation around x, y and z to get the new vector
// - global `boolean` whether to rotate around the global axis
const ROTATE = (v, r, global = true) => {
    const [rx, ry, rz] = r
    const [kx, ky_, kz_] = UNIT_VECTORS

    const ky = global
      ? ky_
      // ky after rotating around x axis
      : ROD_ROTATE(ky, kx, rx)

    const kz = global
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

console.log(
  ROTATE([200, 150, -400], [174.53, 51.7, 122.56])
)
