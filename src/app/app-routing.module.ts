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
import { warehouseManagerGuard } from 'src/shared/guards/warehouse-manager.guard';
import { supplierGuard } from 'src/shared/guards/supplier.guard';
import { inventoryManagerGuard } from 'src/shared/guards/inventory-manager.guard';
import { staffGuard } from 'src/shared/guards/staff.guard';
import { vendorGuard } from 'src/shared/guards/vendor.guard';
import { authGuard } from 'src/shared/guards/auth.guard';

const routes: Routes = [
  {path: "", component: AuthComponent},
  {path: "register", component: RegisterComponent},
  {path: "layout", component: LayoutComponent},
  {path: "dashboard", component: DashboardComponent, canActivate:[warehouseManagerGuard]},
  {path: "supplier-dashboard", component: SupplierDashboardComponent, canActivate:[supplierGuard]},
  {path: "im-dashboard", component: ImDashboardComponent, canActivate:[inventoryManagerGuard]},
  {path: 'staff-dashboard', component: StaffDashboardComponent, canActivate:[staffGuard]},
  {path: 'checkin_sku',component: CheckinSkuComponent, canActivate: [authGuard]},
  {path: 'checkin_loc',component: CheckinLocComponent, canActivate: [authGuard]},
  {path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate:[vendorGuard]},
  {path: 'test', component: QrGenComponent},
  {path: 'order-view', component: OrderViewComponent},
  {path: 'report', component: ReportComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
