import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { CANVAS_BLOCK_SIZE, CANVAS_COLUMNS, KeyboardControlKey } from './game/constants'
import { Board } from './game/board'
import { Piece } from './game/piece'
import { Coordinate, takeCoordinatesCalculator } from './game/models'

@Component({
  selector: 'ri-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvasElement')
  public canvasElementRef!: ElementRef<HTMLCanvasElement>
  public board: Board | null = null

  @HostListener('keydown', [ '$event' ])
  public onKeyDown(event: KeyboardEvent): void {
    event.preventDefault()
    const key: KeyboardControlKey = event.key as KeyboardControlKey

    debugger
    if (!Object.values(KeyboardControlKey).includes(key)) {
      return
    }

    const coordinateCalculate: (coordinate: Coordinate) => Coordinate = takeCoordinatesCalculator(key)

    if (this.board) {
      const newCoordinate: Coordinate = coordinateCalculate(this.board.piece?.coords as any)

      if (this.board.checkIsCoordinatesValid(newCoordinate)) {
        this.board.piece?.move(newCoordinate)
        this.board.canvasContent.clearRect(0, 0, this.board.canvasContent.canvas.width, this.board.canvasContent.canvas.height)
        this.board.piece?.draw()
      }
    }
  }

  constructor() {
  }

  public onClickPlayButton(): void {
    if (this.board !== null) {
      this.board.reset()
      const piece: Piece = new Piece(this.board.canvasContent)
      piece.draw()
      this.board.piece = piece
    } else {
      throw new Error(`Board does not exist`)
    }
  }

  public ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvasElementRef.nativeElement
    const canvasContext: CanvasRenderingContext2D | null = canvasEl.getContext('2d')

    canvasEl.width = CANVAS_COLUMNS * CANVAS_BLOCK_SIZE
    canvasEl.height = CANVAS_COLUMNS * CANVAS_BLOCK_SIZE

    if (canvasContext !== null) {
      canvasContext.scale(CANVAS_BLOCK_SIZE, CANVAS_BLOCK_SIZE)
      this.board = new Board(canvasContext)
    } else {
      throw new Error(`Canvas context does not exist`)
    }
  }
}
