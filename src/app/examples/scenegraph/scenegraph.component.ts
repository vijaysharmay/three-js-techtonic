import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Object3D } from 'three';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  SphereGeometry,
  PlaneGeometry
} from 'three';

@Component({
  selector: 'app-scenegraph',
  templateUrl: './scenegraph.component.html',
  styleUrls: ['./scenegraph.component.css']
})
export class ScenegraphComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(){
    const divContainer = document.getElementById("scenegraph");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    // const threeSpace = new Object3D();

    const parentGeometry = new BoxGeometry();
    const parentMaterial = new MeshBasicMaterial( { color: new Color('red') } );
    const parentCube = new Mesh( parentGeometry, parentMaterial );
    // threeSpace.add(parentCube);

    const child1Geometry = new SphereGeometry();
    const child1Material = new MeshBasicMaterial( { color: new Color('blue') } );
    const child1Cube = new Mesh( child1Geometry, child1Material );
    child1Cube.position.x = 2;
    parentCube.add(child1Cube);
    // threeSpace.add(child1Cube);

    const child2Geometry = new PlaneGeometry();
    const child2Material = new MeshBasicMaterial( { color: new Color('green'), wireframe: true } );
    const child2Cube = new Mesh( child2Geometry, child2Material );
    child2Cube.position.y = 4;
    child1Cube.add(child2Cube);
    // threeSpace.add(child2Cube);

    camera.position.z = 10;

    scene.add( parentCube );
    // scene.add(threeSpace);
    renderer.render( scene, camera );

    setInterval(() => {
      parentCube.rotation.z += 1;
      // threeSpace.rotation.z = -1;
      renderer.render( scene, camera );        
    }, 1000);
  }

}



  

