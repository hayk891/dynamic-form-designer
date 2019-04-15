import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { ControlMessagesComponent } from './control-message/control-message.component';
import { ResponsesComponent } from './responses/responses.component';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        HeaderComponent,
        FooterComponent,
        HomepageComponent,
        EditModeComponent,
        ViewModeComponent,
        ControlMessagesComponent,
        ResponsesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxJsonViewerModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
