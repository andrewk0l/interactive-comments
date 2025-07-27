import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { FormsModule } from '@angular/forms';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { Confirmmodal } from './confirmmodal/confirmmodal';

@NgModule({
  declarations: [
    App,
    CommentComponent,
    CommentSectionComponent,
    Confirmmodal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
