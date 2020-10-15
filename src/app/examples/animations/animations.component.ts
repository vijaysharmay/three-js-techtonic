import { Component, OnInit } from '@angular/core';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Clock
} from 'three';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css']
})
export class AnimationsComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    const divContainer = document.getElementById("animations");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    scene.background = new Color('white');
    const camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const geometry = new BoxGeometry();
    const color = new Color(1, 0.2, 0.7);
    const material = new MeshBasicMaterial( { color } );
    const cube = new Mesh( geometry, material );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.2;
    
    scene.add( cube );

    camera.position.z = 5;

    const animate = function (time) {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };


    // let then = 0;
    // const animate = function (time) {
    //   requestAnimationFrame( animate );
    //   time *= 0.1;
    //   const delta = time - then;
    //   then = time;
    //   cube.rotation.x += 0.01 * delta;
    //   cube.rotation.y += 0.01 * delta;
    //   renderer.render( scene, camera );
    // };

    // let clock = new Clock();
    // let speed = 50;
    // let delta = 0;
    // const animate = function (time) {
    //   requestAnimationFrame( animate );
    //   delta = clock.getDelta();
    //   cube.rotation.x += 0.01 * speed * delta;
    //   cube.rotation.y += 0.01 * speed * delta;
    //   renderer.render( scene, camera );
    // };

  
    requestAnimationFrame(animate);
  }

}
