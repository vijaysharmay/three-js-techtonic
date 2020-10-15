import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  SphereGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  Mesh,
  Color,
  Vector3,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  RectAreaLight,
  MathUtils,
  OrthographicCamera,
  Object3D
} from 'three';

@Component({
  selector: 'app-lcr',
  templateUrl: './lcr.component.html',
  styleUrls: ['./lcr.component.css']
})
export class LcrComponent implements OnInit {

  primaryCamera: PerspectiveCamera;
  secondaryCamera: OrthographicCamera;
  renderer: WebGLRenderer;
  scene: Object3D;

  ngOnInit(): void {
    const divContainer = document.getElementById("lcr");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    this.scene = new Scene();
    this.primaryCamera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );
    this.secondaryCamera = new OrthographicCamera(-10, 10, 10, -10, 0.1, 20);

    this.secondaryCamera.position.z = 10;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize( width, height );
    divContainer.appendChild(this.renderer.domElement );

    const parentGeometry = new BoxGeometry();
    const parentMaterial = new MeshBasicMaterial( { color: new Color('red') } );
    // const parentMaterial = new MeshStandardMaterial( { color: new Color('red') } );
    // const parentMaterial = new MeshPhongMaterial( { color: '#8AC' } );
    const parentCube = new Mesh( parentGeometry, parentMaterial );

    const child1Geometry = new SphereGeometry(1, 32, 16);
    const child1Material = new MeshBasicMaterial( { color: new Color('blue') } );
    // const child1Material = new MeshStandardMaterial( { color: new Color('blue') } );
    // const child1Material = new MeshPhongMaterial( { color: new Color('#CA8') } );
    const child1Cube = new Mesh( child1Geometry, child1Material );
    child1Cube.position.set(2, 0, 1);

    const child2Geometry = new PlaneGeometry();
    const child2Material = new MeshBasicMaterial( { color: new Color('green') } );
    // const child2Material = new MeshStandardMaterial( { color: new Color('green') } );
    // const child2Material = new MeshPhongMaterial( { color: new Color('grey') } );
    const child2Cube = new Mesh( child2Geometry, child2Material );
    child2Cube.scale.set(10, 10, 10);
    child2Cube.position.z = -1;

    this.scene.add(parentCube);
    this.scene.add(child1Cube);
    this.scene.add(child2Cube);

    this.primaryCamera.position.set(0, -3, 2);
    this.primaryCamera.lookAt(new Vector3(0, 0, 0));
    this.primaryCamera.updateProjectionMatrix();

    // const ambientLight = new AmbientLight(new Color('white'), 1);
    // this.scene.add(ambientLight);

    // const hemisphereLight = new HemisphereLight(0xB1E1FF, 0xB97A20, 1);
    // hemisphereLight.position.set(0,0,10);
    // this.scene.add(hemisphereLight);

    // const pointLight = new PointLight(new Color('cyan'), 1);
    // pointLight.position.set(0,0,20);
    // this.scene.add(pointLight);

    // const directionalLight = new DirectionalLight(new Color('white'), 1);
    // directionalLight.position.set(10, 10, 10);
    // directionalLight.target.position.set(0, 0, 0);
    // this.scene.add(directionalLight);
    // this.scene.add(directionalLight.target);

    // const spotLight = new SpotLight(new Color('white'), 1);
    // spotLight.position.set(0, 0, 2);
    // spotLight.penumbra = 1;
    // spotLight.target.position.set(0, 0, 0);
    // this.scene.add(spotLight);
    // this.scene.add(spotLight.target);

    // const rectAreaLight = new RectAreaLight(new Color('white'), 1, 10, 5);
    // rectAreaLight.position.set(0, 0, 2);
    // rectAreaLight.rotation.x = MathUtils.degToRad(-90);
    // this.scene.add(rectAreaLight);

    // this.renderer.physicallyCorrectLights = true;
    this.renderer.render( this.scene, this.primaryCamera );
  }

  @HostListener('document:keydown', ['$event'])
  handleCameraChange(event){
    if(event.key == 'o'){
      this.renderer.render( this.scene, this.secondaryCamera );
    } else if(event.key == 'p') {
      this.renderer.render( this.scene, this.primaryCamera );
    } else {
      return;
    }
  }

}
