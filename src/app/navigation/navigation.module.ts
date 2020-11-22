import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent, FooterComponent, HomeComponent],
  imports: [CommonModule, RouterModule],
  //adicionar exports quando queremos usar os componestes deste modulo em outras
  // componentes do sistema
  exports: [MenuComponent, FooterComponent, HomeComponent],
})
export class NavigationModule {}
