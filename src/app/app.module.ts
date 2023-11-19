import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { LayoutComponent } from './layout/layout.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';
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
import { ChartCompoComponent } from './chart-compo/chart-compo.component';
import { ChartCompVendorComponent } from './chart-comp-vendor/chart-comp-vendor.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    QrScanComponent,
    NavbarComponent,
    AuthComponent,
    DashboardComponent,
    RegisterComponent,
    SupplierDashboardComponent,
    ImDashboardComponent,
    StaffDashboardComponent,
    CheckinSkuComponent,
    CheckinLocComponent,
    VendorDashboardComponent,
    QrGenComponent,
    OrderViewComponent,
    ReportComponent,
    ChartCompoComponent,
    ChartCompVendorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ZXingScannerModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
