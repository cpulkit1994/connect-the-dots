export interface GameBoardSize {
  id      : GAME_BOARD_SIZE
  value   : string
  row     : number
  column  : number
}

export interface GamingDetail {
  firstPlayerName   : string
  secondPlayerName  : string
  boardSize         : GameBoardSize
}

export enum GAME_BOARD_SIZE {
  FIVE_SIX  = 'FIVE_SIX',
  SIX_SIX   = 'SIX_SIX',
  SEVEN_SIX = 'SEVEN_SIX'
}

