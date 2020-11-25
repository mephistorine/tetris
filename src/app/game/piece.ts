import { CellColorValue, Coordinate } from './models'

export class Piece {
  public color: string = 'blue'
  public shape: CellColorValue[][] = [
    [ 2, 0, 0 ],
    [ 2, 2, 2 ],
    [ 0, 0, 0 ]
  ]

  public coords: Coordinate = new Coordinate(3, 0)

  constructor(public readonly canvasContext: CanvasRenderingContext2D) {
  }

  public draw(): void {
    this.canvasContext.fillStyle = this.color

    this.shape.forEach((row: CellColorValue[], y: number) => {
      row.forEach((value: CellColorValue, x: number) => {
        if (value > 0) {
          this.canvasContext.fillRect(this.coords.x + x, this.coords.y + y, 1, 1)
        }
      })
    })
  }

  public move(newCoordinates: Coordinate): void {
    this.coords = newCoordinates
  }
}
