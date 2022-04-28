import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dispositivo/:dispositivoId',
    loadChildren: () => import('./dispositivo/dispositivo.module').then(m => m.DispositivoPageModule)
  },
  {
    path: 'mediciones/:dispositivoId',
    loadChildren: () => import('./mediciones/mediciones.module').then(m => m.MedicionesPageModule)
  },
  {
    path: 'logs/:valvulaId',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsPageModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
