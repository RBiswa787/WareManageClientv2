import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { ImDashboardComponent } from './im-dashboard/im-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { CheckinSkuComponent } from './checkin-sku/checkin-sku.component';
import { CheckinLocComponent } from './checkin-loc/checkin-loc.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: "", component: AuthComponent},
  {path: "register", component: RegisterComponent},
  {path: "layout", component: LayoutComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "supplier-dashboard", component: SupplierDashboardComponent},
  {path: "im-dashboard", component: ImDashboardComponent},
  {path: 'staff-dashboard', component: StaffDashboardComponent},
  {path: 'checkin_sku',component: CheckinSkuComponent},
  {path: 'checkin_loc',component: CheckinLocComponent},
  {path: 'vendor-dashboard', component: VendorDashboardComponent},
  {path: 'test', component: QrGenComponent},
  {path: 'order-view', component: OrderViewComponent},
  {path: 'report', component: ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
