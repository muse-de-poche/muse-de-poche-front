import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MetronomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
