import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { StarterComponent } from './starter/starter.component';
import { AuthenticationRoutes } from './authentication/authentication.routing';


export const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/starter', pathMatch: 'full' },
            { path: 'starter', component: StarterComponent },
        ],
    },
    {
        path: '',
        component: BlankComponent
    },
    ...AuthenticationRoutes, 
    { path: '**', redirectTo: '/auth/404' },
];

