import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { StarterComponent } from './starter/starter.component';
import { AuthenticationRoutes } from './authentication/authentication.routing';
import { ListProductComponent } from './components/list-product/list-product.component';

export const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/playteca', pathMatch: 'full' },
            { path: 'playteca', component: StarterComponent },
            { path: 'juegos', component: ListProductComponent }
        ],
    },
    {
        path: '',
        component: BlankComponent
    },
    ...AuthenticationRoutes, 
    { path: '**', redirectTo: '/auth/404' },
];

