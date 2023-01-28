import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./Pagina/header/header.component";
import {CadastrarComponent} from "./Modulos/cadastrar/cadastrar.component";
import {InformacoesPessoaisComponent} from "./Modulos/cadastrar/informacoes-pessoais/informacoes-pessoais.component";
import {EnderecoComponent} from "./Modulos/cadastrar/endereco/endereco.component";
import {MenuComponent} from "./Menu/menu.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import {AppRoutingModule} from "./app.routing.module";
import {RouterOutlet} from "@angular/router";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {InserirComponent} from "./Modulos/inserir/inserir.component";
import {ConsultarComponent} from "./Modulos/consultar/consultar.component";
import {FooterComponent} from "./Pagina/footer/footer.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask'
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from "./Home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastrarComponent,
    InformacoesPessoaisComponent,
    EnderecoComponent,
    InserirComponent,
    ConsultarComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    AppRoutingModule,
    RouterOutlet,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    provideNgxMask(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
