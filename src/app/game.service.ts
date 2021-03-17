import { Injectable }   from '@angular/core'
import { GamingDetail } from './game-interface'

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private gameDetail : GamingDetail = {} as GamingDetail

  constructor() { }

  setGamingDetail(detail : GamingDetail) {
    this.gameDetail = Object.assign({}, detail)
  }

  getGamingDetail() : GamingDetail {
    return this.gameDetail
  }
}
