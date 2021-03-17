import { Component,
         OnInit
       }                            from '@angular/core'
import { FormBuilder,
         FormGroup
       }                            from '@angular/forms'
import { Router }                   from '@angular/router'
import { GameBoardSize,
         GAME_BOARD_SIZE,
         GamingDetail
       }                            from '../game-interface'
import { GameService }              from '../game.service'

@Component({
  selector    : 'app-landing',
  templateUrl : './landing.component.html',
  styleUrls   : ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  gameForm      : FormGroup
  boardSize     : GameBoardSize[] = []

  constructor(private gameServ  : GameService,
    private formBuilder         : FormBuilder,
    private router              : Router) {

    this.gameForm  = this.formBuilder.group({
      player1         : ['Player1'],
      player2         : ['Player2'],
      boardSizeDetail : [null],
    })
  }

  ngOnInit() {
    this.boardSize = [
      {
        id      : GAME_BOARD_SIZE.FIVE_SIX,
        value   : '5 X 6',
        row     : 5,
        column  : 6
      },
      {
        id      : GAME_BOARD_SIZE.SIX_SIX,
        value   : '6 X 6',
        row     : 6,
        column  : 6
      },
      {
        id      : GAME_BOARD_SIZE.SEVEN_SIX,
        value   : '7 X 6',
        row     : 7,
        column  : 6
      }
    ]

    this.gameForm.controls['boardSizeDetail'].setValue(this.boardSize[0])
  }

  /*============================================================================
                                HTML
  ============================================================================*/

  onStartClick() {
    const detail : GamingDetail = {
      firstPlayerName   : this.gameForm.controls['player1'].value,
      secondPlayerName  : this.gameForm.controls['player2'].value,
      boardSize         : this.gameForm.controls['boardSizeDetail'].value
    }

    this.gameServ.setGamingDetail(detail)
    this.router.navigate(['game'])
  }
}
