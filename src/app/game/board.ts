import { CellColorValue, Coordinate } from './models'
import { CANVAS_COLUMNS, CANVAS_ROWS } from './constants'
import { Piece } from './piece'

export class Board {
  public grid: CellColorValue[][] = this.takeEmptyGrid()
  public piece: Piece | null = null

  constructor(public readonly canvasContent: CanvasRenderingContext2D) {
  }

  public reset(): void {
    this.grid = this.takeEmptyGrid()
  }

  public checkIsCoordinatesValid(coordinates: Coordinate): boolean {
    return true
  }

  private takeEmptyGrid(): CellColorValue[][] {
    return Array.from({ length: CANVAS_ROWS }, () => new Array(CANVAS_COLUMNS).fill(0))
  }
}
