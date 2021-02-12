import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureComponentComponent } from  './secure-component/secure-component.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component'; 

import { AuthenticationGuard } from './shared/authentication.guard';

const routes: Routes = [
    {
        path: 'secure',
        component: SecureComponentComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'public',
        component: PublicComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}