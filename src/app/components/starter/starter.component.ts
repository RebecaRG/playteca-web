import { Component} from '@angular/core';
import { NgbCarouselModule, NgbCarouselConfig, } from '@ng-bootstrap/ng-bootstrap';
import { InfoPlayteca } from 'src/app/interfaces/infoPlayteca';
import { InfoPlaytecaService } from 'src/app/services/info-playteca.service';



@Component({
  selector: 'app-starter', 
  standalone: true,
  imports: [ NgbCarouselModule] ,
  templateUrl: './starter.component.html', 
  styleUrl: './starter.component.scss'
})

export class StarterComponent {
  showNavigationArrows = false;
	showNavigationIndicators = false;
  infoCard: InfoPlayteca[] = this.infoPlaytecaService.getInfoCard();

  images =[ "login-register", "tablero", "fichas"].map((n) => `assets/images/background/${n}.jpg`);
  
  constructor(config: NgbCarouselConfig, public infoPlaytecaService: InfoPlaytecaService) {
		// customize default values of carousels used by this component tree
		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
	}
}

