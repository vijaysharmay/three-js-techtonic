import { Component, OnInit } from '@angular/core';

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  TextureLoader,
  NearestFilter,
  RepeatWrapping,
  MirroredRepeatWrapping,
  ClampToEdgeWrapping,
  MathUtils,
  Object3D,
  Group
} from 'three';

@Component({
  selector: 'app-textures',
  templateUrl: './textures.component.html',
  styleUrls: ['./textures.component.css']
})
export class TexturesComponent implements OnInit {

  loader: TextureLoader;
  wrapMapping;

  constructor() { 
    this.loader = new TextureLoader();
    this.wrapMapping = {
      repeat: RepeatWrapping,
      mirrorRepeat: MirroredRepeatWrapping,
      clampRepeat: ClampToEdgeWrapping
    };
  }

  ngOnInit(){
    const divContainer = document.getElementById("textures");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;
    const scene = new Scene();
    const camera = new PerspectiveCamera( 25, width / height, 0.1, 1000 );

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const cubeGroup = new Group();
    const onCubeLoad = (cube: Mesh) => cubeGroup.add(cube);

    const cubePromises = [
      this.drawCube(0, 0, "assets/checker.png", 'repeat').then(onCubeLoad),
      this.drawCube(-2, 2, "assets/checker.png", 'mirrorRepeat').then(onCubeLoad),
      this.drawCube(2, 2, "assets/checker.png", 'clampRepeat').then(onCubeLoad)
    ];

    Promise.all(cubePromises).then(() => {
      scene.add(cubeGroup);
      camera.position.set(0, -5, 2);
      camera.lookAt(0, 0, 0);
      renderer.render( scene, camera );  
    })
  }

  drawCube(xPos, yPos, texturePath, wrapType) {
    return new Promise((resolve) => {
      this.loader.load(texturePath, (texture) => {
        const geometry = new BoxGeometry();
        texture.wrapS = this.wrapMapping[wrapType];
        texture.wrapT = this.wrapMapping[wrapType];

        texture.magFilter = NearestFilter;

        // texture.offset.set(0.5, 0.25);

        // texture.center.set(0.5, 0.5);
        // texture.rotation = MathUtils.degToRad(90);

        texture.repeat.set(2, 2);

        const material = new MeshBasicMaterial( { map: texture } );
        const cube = new Mesh( geometry, material );
        cube.position.set(xPos, yPos, 0);
        resolve(cube);
      }, () => resolve());
    });
  }
}
