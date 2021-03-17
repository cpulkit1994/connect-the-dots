import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { AppRoutingModule }         from './app-routing.module'
import { AppComponent }             from './app.component'
import { LandingComponent }         from './landing/landing.component'
import { GameComponent }            from './game/game.component'
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { MaterialModule }           from './material.module'
import { ReactiveFormsModule }      from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
