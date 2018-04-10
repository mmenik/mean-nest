import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './layout/home/home.component';
import { BagComponent } from './bag/bag.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'bag', component: BagComponent, canActivate: [AuthGuard] },
    { path: 'user', loadChildren: './user/user.module#UserModule', canLoad: [AuthGuard] }
    // { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
