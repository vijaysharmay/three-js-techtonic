import { Component, OnInit } from '@angular/core';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  Color,
  TextureLoader,
  Group,
  SphereGeometry,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  SpotLight,
  MeshToonMaterial
} from 'three';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  loader: TextureLoader;
  materialMapping;

  constructor() { 
    this.loader = new TextureLoader();
    this.materialMapping = {
      basic: MeshBasicMaterial,
      lambert: MeshLambertMaterial,
      phong: MeshPhongMaterial,
      toon: MeshToonMaterial,
      standard: MeshStandardMaterial,
      physical: MeshPhysicalMaterial
    };
  }

  ngOnInit(){
    const divContainer = document.getElementById("materials");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    const camera = new PerspectiveCamera( 25, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const defaultProps = {
      color: new Color('red')
    };

    const basicSphere = this.drawSphere(-20, 0, 'basic', defaultProps);
    const lambertSphere = this.drawSphere(-10, 0, 'lambert', defaultProps);
    const phongSphere = this.drawSphere(0, 0, 'phong', { ...defaultProps, shininess: 100});
    // const toonSphere = this.drawSphere(2.5, 0, 'toon', defaultProps);
    const standardSphere = this.drawSphere(10, 0, 'standard', { ...defaultProps, roughness: 1, metalness: 0 });
    const physicalSphere = this.drawSphere(20, 0, 'physical', { ...defaultProps, roughness: 1, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.4 });

    const light = new SpotLight(new Color('white'), 2);
    light.position.set(0, 0, 100);
    scene.add(light);

    
    scene.add(basicSphere);
    scene.add(lambertSphere);
    scene.add(phongSphere);
    // scene.add(toonSphere);
    scene.add(standardSphere);
    scene.add(physicalSphere);
    camera.position.set(0, 0, 60);
    // camera.lookAt(0, 0, 0);
    renderer.render( scene, camera );  
  }

  drawSphere(xPos, yPos, materialType, props) {
    const geometry = new SphereGeometry(3, 32, 16);
    const material = new this.materialMapping[materialType]( props );
    const sphere = new Mesh( geometry, material );
    sphere.position.set(xPos, yPos, 0);
    return sphere;
  }
}
