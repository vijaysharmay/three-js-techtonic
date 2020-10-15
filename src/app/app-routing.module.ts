import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleComponent } from './examples/simple/simple.component';
import { MaterialsComponent } from './examples/materials/materials.component';
import { TexturesComponent } from './examples/textures/textures.component';
import { AnimationsComponent } from './examples/animations/animations.component';
import { WebglComponent } from './examples/webgl/webgl.component';
import { PrimitivesComponent } from './examples/primitives/primitives.component';
import { ScenegraphComponent } from './examples/scenegraph/scenegraph.component';
import { LcrComponent } from './examples/lcr/lcr.component';

const routes: Routes = [
  { path: "webgl", component: WebglComponent },
  { path: "simple", component: SimpleComponent },
  { path: "primitives", component: PrimitivesComponent },
  { path: "scenegraph", component: ScenegraphComponent },
  { path: "lcr", component: LcrComponent },
  { path: "materials", component: MaterialsComponent },
  { path: "textures", component: TexturesComponent },
  { path: "animations", component: AnimationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
