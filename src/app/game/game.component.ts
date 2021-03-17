import { Component,
         OnInit
       }                        from '@angular/core'
import { GamingDetail }         from '../game-interface'
import { GameService }          from '../game.service'

enum PLAYER {
  PLAYER_1  = 'PLAYER_1',
  PLAYER_2  = 'PLAYER_2'
}

enum GAME_RESULT {
  PLAYER_1_WON  = 'PLAYER_1_WON',
  PLAYER_2_WON  = 'PLAYER_2_WON',
  DRAW          = 'DRAW',
  PLAYING       = 'PLAYING'
}

@Component({
  selector    : 'app-game',
  templateUrl : './game.component.html',
  styleUrls   : ['./game.component.scss']
})

export class GameComponent implements OnInit {

  gameDetail              : GamingDetail  = {} as GamingDetail
  roundList               : number[]      = []
  rowList                 : number[]      = []
  playedPlayer            : PLAYER        = PLAYER.PLAYER_1
  selectedCol             : number        = -1
  firstPlayerSelections   : string[]      = []
  secondPlayerSelections  : string[]      = []
  gameResult              : GAME_RESULT   = GAME_RESULT.PLAYING
  winningSelection        : string[]      = []

  PLAYER      = PLAYER
  GAME_RESULT = GAME_RESULT

  constructor(private gameServ  : GameService) { }

  ngOnInit() {
    this.gameDetail = this.gameServ.getGamingDetail()
    for (let i = 1; i <= this.gameDetail.boardSize.column; i ++) {
      this.roundList.push(i)
    }

    for (let i = 1; i <= this.gameDetail.boardSize.row; i ++) {
      this.rowList.push(i)
    }
  }

  /*============================================================================
                                Private
  ============================================================================*/

  private validateResult(selections : string[], row : number, col : number) : string[] {

    const winSelection1 : string[] = [row + '' + col],
          winSelection2 : string[] = [row + '' + col],
          winSelection3 : string[] = [row + '' + col],
          winSelection4 : string[] = [row + '' + col],
          winSelection5 : string[] = [row + '' + col],
          winSelection6 : string[] = [row + '' + col],
          winSelection7 : string[] = [row + '' + col],
          winSelection8 : string[] = [row + '' + col]

    for (let i = 1; i <= 3; i ++) {
      const index1  :  string  = row - i  + '' + col,
            index2  :  string  = row + i  + '' + col,
            index3  :  string  = row      + '' + Number(col - i),
            index4  :  string  = row      + '' + Number(col + i),
            index5  :  string  = row - i  + '' + Number(col - i),
            index6  :  string  = row + i  + '' + Number(col + i),
            index7  :  string  = row + i  + '' + Number(col - i),
            index8  :  string  = row - i  + '' + Number(col + i)

      if (selections.includes(index1)) winSelection1.push(index1)
      if (selections.includes(index2)) winSelection2.push(index2)
      if (selections.includes(index3)) winSelection3.push(index3)
      if (selections.includes(index4)) winSelection4.push(index4)
      if (selections.includes(index5)) winSelection5.push(index5)
      if (selections.includes(index6)) winSelection6.push(index6)
      if (selections.includes(index7)) winSelection7.push(index7)
      if (selections.includes(index8)) winSelection8.push(index8)
    }

    if (winSelection1.length === 4) return winSelection1
    else if (winSelection2.length === 4) return winSelection2
    else if (winSelection3.length === 4) return winSelection3
    else if (winSelection4.length === 4) return winSelection4
    else if (winSelection5.length === 4) return winSelection5
    else if (winSelection6.length === 4) return winSelection6
    else if (winSelection7.length === 4) return winSelection7
    else if (winSelection8.length === 4) return winSelection8
    return winSelection1
  }

  private checkGame(selectedId : string) {
    const row           : number    = Math.floor(Number(selectedId)/10),
          col           : number    = Number(selectedId) % 10,
          concatArr     : string[]  = [...this.firstPlayerSelections, ...this.secondPlayerSelections],
          winSelection  : string[]  = []

    if (this.playedPlayer === PLAYER.PLAYER_1) {
      winSelection.push(...this.validateResult(this.firstPlayerSelections, row, col))
    } else if (this.playedPlayer === PLAYER.PLAYER_2) {
      winSelection.push(...this.validateResult(this.secondPlayerSelections, row, col))
    }

    if (winSelection.length === 4) {
      this.winningSelection = winSelection
      this.gameResult       = this.playedPlayer === PLAYER.PLAYER_1 ? GAME_RESULT.PLAYER_1_WON
                                : GAME_RESULT.PLAYER_2_WON
    }

    if (concatArr.length === this.gameDetail.boardSize.row * this.gameDetail.boardSize.column
        && this.gameResult === GAME_RESULT.PLAYING) {
      this.gameResult = GAME_RESULT.DRAW
    }
  }

  private getRow(col : number) : number {
    let rowNo       : number    = 0
    const concatArr : string[]  = [...this.firstPlayerSelections, ...this.secondPlayerSelections]

    if (concatArr.length) {
      for (let i = this.rowList.length -1; i >= 0; i --) {
        const selectedId  : string = this.rowList[i]+ '' + col

        if (!concatArr.includes(selectedId)) {
          rowNo = this.rowList[i]
          break
        }
      }
    } else {
      rowNo = this.rowList[this.rowList.length - 1]
    }

    return rowNo
  }

  /*============================================================================
                                HTML
  ============================================================================*/

  onPlayerMove(colNo : number) {
    if (this.gameResult !== GAME_RESULT.PLAYING) return

    const rowNo = this.getRow(colNo)

    if (rowNo === 0) return

    const selectedId = rowNo + '' + colNo

    this.playedPlayer === PLAYER.PLAYER_1 ? this.firstPlayerSelections.push(selectedId)
      : this.secondPlayerSelections.push(selectedId)

    if (this.firstPlayerSelections.length > 3 || this.secondPlayerSelections.length > 3) {
      this.checkGame(selectedId)
    }

    this.playedPlayer = this.playedPlayer === PLAYER.PLAYER_1 ? PLAYER.PLAYER_2 : PLAYER.PLAYER_1
  }

  onRestartGame() {
    this.firstPlayerSelections  = []
    this.secondPlayerSelections = []
    this.winningSelection       = []
    this.playedPlayer           = PLAYER.PLAYER_1
    this.gameResult             = GAME_RESULT.PLAYING
  }

}
