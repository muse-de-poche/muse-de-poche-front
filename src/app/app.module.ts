import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgAudioRecorderModule } from 'ng-audio-recorder';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompositionEditorComponent } from './components/composition-editor/composition-editor.component';
import { CompositionCardComponent } from './components/composition-card/composition-card.component';
import { TrackComponent } from './components/composition-editor/track/track.component';
import { MetronomeComponent } from './components/composition-editor/metronome/metronome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './components/signin/signin.component';
import { PreviewComponent } from './components/dashboard/preview/preview.component';
import { MyCompositionsComponent } from './components/dashboard/my-compositions/my-compositions.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { SoundComponent } from './components/composition-editor/sound/sound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    DashboardComponent,
    CompositionEditorComponent,
    CompositionCardComponent,
    TrackComponent,
    MetronomeComponent,
    SignupComponent,
    SigninComponent,
    PreviewComponent,
    MyCompositionsComponent,
    SettingsComponent,
    SoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgAudioRecorderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
