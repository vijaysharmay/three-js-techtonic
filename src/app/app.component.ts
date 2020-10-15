import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Color, MeshBasicMaterial, Mesh, TorusKnotBufferGeometry } from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{
  routerURL: string;

  constructor(public router: Router){}
  
  ngAfterViewInit(): void {
    const divContainer = document.getElementById("default");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    scene.background = new Color('white');
    const camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const geometry = new TorusKnotBufferGeometry(5, 2.5, 16, 64, 3, 5);
    const color = new Color('orange');
    const material = new MeshBasicMaterial( { color, wireframe: true } );
    const mesh = new Mesh( geometry, material );
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.2;
    
    scene.add( mesh );

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
  }
}
