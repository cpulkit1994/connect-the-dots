import { NgModule }                                       from '@angular/core'
import { MatCardModule }                                  from '@angular/material/card'
import { MatFormFieldModule }                             from '@angular/material/form-field'
import { MatSelectModule }                                from '@angular/material/select'

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [],

})

export class MaterialModule { }
