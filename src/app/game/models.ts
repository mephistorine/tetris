import { KeyboardControlKey } from './constants'

export enum CellColorValue {
  empty,
  yellow,
  blue,
  green,
  violet,
  red,
  orange,
  aqua
}

export class Coordinate {
  constructor(public x: number,
              public y: number) {
  }
}

export function takeCoordinatesCalculator(key: KeyboardControlKey): (coordinates: Coordinate) => Coordinate {
  switch (key) {
    case KeyboardControlKey.left:
      return (coordinates: Coordinate) => new Coordinate(coordinates.x - 1, coordinates.y)
    case KeyboardControlKey.right:
      return (coordinates: Coordinate) => new Coordinate(coordinates.x + 1, coordinates.y)
    case KeyboardControlKey.down:
      return (coordinates: Coordinate) => new Coordinate(coordinates.x, coordinates.y + 1)
    default: {
      throw new Error(`Not supported key: ${ key }`)
    }
  }
}
