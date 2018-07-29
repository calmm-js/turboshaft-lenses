export const staged_x_xy = (fx, fxy) =>
  function staged(x, y) {
    x = fx(x)
    if (arguments.length < 2)
      return function staged(y) {
        return fxy(x, y)
      }
    return fxy(x, y)
  }

export const staged_x_xy_yz = (fx, fxy, fyz) =>
  function staged(x, y, z) {
    x = fx(x)
    if (arguments.length < 2)
      return function staged(y, z) {
        y = fxy(x, y)
        if (arguments.length < 2)
          return function staged(z) {
            return fyz(y, z)
          }
        return fyz(y, z)
      }
    y = fxy(x, y)
    if (arguments.length < 3)
      return function staged(z) {
        return fyz(y, z)
      }
    return fyz(y, z)
  }
