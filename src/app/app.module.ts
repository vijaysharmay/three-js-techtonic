import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';  
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

import { SimpleComponent } from './examples/simple/simple.component';
import { MaterialsComponent } from './examples/materials/materials.component';
import { AnimationsComponent } from './examples/animations/animations.component';
import { WebglComponent } from './examples/webgl/webgl.component';
import { PrimitivesComponent } from './examples/primitives/primitives.component';
import { ScenegraphComponent } from './examples/scenegraph/scenegraph.component';
import { LcrComponent } from './examples/lcr/lcr.component';
import { TexturesComponent } from './examples/textures/textures.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    MaterialsComponent,
    AnimationsComponent,
    WebglComponent,
    PrimitivesComponent,
    ScenegraphComponent,
    LcrComponent,
    TexturesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    // BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
