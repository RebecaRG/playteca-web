import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { StarterComponent } from './starter/starter.component';
import { AuthenticationRoutes } from './authentication/authentication.routing';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { TablonUsuarioComponent } from './components/tablon-usuario/tablon-usuario.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/playteca', pathMatch: 'full' },
            { path: 'playteca', component: StarterComponent },
            { path: 'juegos', component: ListProductComponent },
            { path: 'juegos/:id', component: ProductDetailComponent},
            { path: 'mapa', component: MapaComponent},
            { path: 'calendario', component: CalendarioComponent},
            { path: 'tablonUsuario', component: TablonUsuarioComponent, canActivate:[authGuard]},


        ],
    },
    {
        path: '',
        component: BlankComponent
    },
    ...AuthenticationRoutes, 
    { path: '**', redirectTo: '/auth/404' },
];

