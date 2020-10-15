import { Component, OnInit } from '@angular/core';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color
} from 'three';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(){
    const divContainer = document.getElementById("simple");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial( { color: new Color('red'), wireframe: true } );
    const cube = new Mesh( geometry, material );

    cube.rotation.x += 0.3;
    cube.rotation.y += 0.5;
    camera.position.z = 5;

    scene.add( cube );
    renderer.render( scene, camera );
  }

}



  

