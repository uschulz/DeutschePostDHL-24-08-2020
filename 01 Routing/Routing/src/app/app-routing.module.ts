import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VouchersListComponent } from './vouchers/vouchers-list.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { VoucherResolver } from './vouchers/voucher-resolver.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { EditorComponent } from './shared/editor/editor.component';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { AdminComponent } from './admin/admin.component';
import { RouteGuard } from './route.guard.service';
import { AdminAComponent } from './admin-a/admin-a.component';
import { AdminBComponent } from './admin-b/admin-b.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'vouchers',
    component: VouchersListComponent,
  },
  {
    path: 'vouchers/:id',
    component: VoucherComponent,
    resolve: { voucherData: VoucherResolver },
  },
  {
    path: 'demos',
    loadChildren: () =>
      import('./demos/demos.module').then((m) => m.DemosModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RouteGuard],
    children: [
      {
        path: 'admina',
        component: AdminAComponent,
      },
      {
        path: 'adminb',
        component: AdminBComponent,
      },
    ],
  },
  { path: 'showeditor', component: EditorComponent, outlet: 'sidebarOutlet' },
  {
    path: 'showuploader',
    component: UploaderComponent,
    outlet: 'sidebarOutlet',
  },
  {
    path: 'wotschers',
    redirectTo: 'vouchers',
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./learning/learning.module').then((m) => m.LearningModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
