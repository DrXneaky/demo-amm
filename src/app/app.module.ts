import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Interceptor } from "./shared/interceptor";
import { AppRoutingModule } from './app-routing.module';
//import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { SecureComponentComponent } from './secure-component/secure-component.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';
//import { OAuthModule } from 'angular-oauth2-oidc-codeflow';

export function storageFactory(): OAuthStorage {
  return localStorage;
}


@NgModule({
  declarations: [
    AppComponent,
    SecureComponentComponent,
    LoginComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory }
    //{ provide: OAuthStorage, useFactory: storageFactory }, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
