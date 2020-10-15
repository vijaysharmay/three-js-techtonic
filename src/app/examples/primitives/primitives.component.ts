import {
  Component,
  OnInit
} from '@angular/core';

import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene, 
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  DoubleSide,
  BoxBufferGeometry,
  CircleBufferGeometry,
  ConeBufferGeometry,
  Curve,
  CylinderBufferGeometry,
  DodecahedronBufferGeometry,
  EdgesGeometry,
  ExtrudeBufferGeometry,
  FontLoader,
  IcosahedronBufferGeometry,
  LatheBufferGeometry,
  LineBasicMaterial,
  LineSegments,
  Object3D,
  OctahedronBufferGeometry,
  ParametricBufferGeometry,
  PlaneBufferGeometry,
  PolyhedronBufferGeometry,
  RingBufferGeometry,
  Shape,
  ShapeBufferGeometry,
  SphereBufferGeometry,
  TetrahedronBufferGeometry,
  TextBufferGeometry,
  TorusBufferGeometry,
  TorusKnotBufferGeometry,
  TubeBufferGeometry,
  Vector2,
  Vector3,
  WireframeGeometry
} from 'three';

@Component({
  selector: 'app-primitives',
  templateUrl: './primitives.component.html',
  styleUrls: ['./primitives.component.css']
})
export class PrimitivesComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    const divContainer = document.getElementById("primitives");
    const width = divContainer.offsetWidth;
    const height = divContainer.offsetHeight;

    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );
    divContainer.appendChild(renderer.domElement );

    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new Scene();
    scene.background = new Color(0.95, 0.95, 0.95);

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    } {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new DirectionalLight(color, intensity);
      light.position.set(1, -2, -4);
      scene.add(light);
    }

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
      obj.position.x = x * spread;
      obj.position.y = y * spread;

      scene.add(obj);
      objects.push(obj);
    }

    function createMaterial() {
      const material = new MeshPhongMaterial({
        side: DoubleSide,
      });

      const hue = Math.random();
      const saturation = 1;
      const luminance = .5;
      material.color.setHSL(hue, saturation, luminance);

      return material;
    }

    function addSolidGeometry(x, y, geometry) {
      const mesh = new Mesh(geometry, createMaterial());
      addObject(x, y, mesh);
    }

    function addLineGeometry(x, y, geometry) {
      const material = new LineBasicMaterial({
        color: 0x000000
      });
      const mesh = new LineSegments(geometry, material);
      addObject(x, y, mesh);
    }

    {
      const width = 8;
      const height = 8;
      const depth = 8;
      addSolidGeometry(-2, 2, new BoxBufferGeometry(width, height, depth));
    } {
      const radius = 7;
      const segments = 24;
      addSolidGeometry(-1, 2, new CircleBufferGeometry(radius, segments));
    } {
      const radius = 6;
      const height = 8;
      const segments = 16;
      addSolidGeometry(0, 2, new ConeBufferGeometry(radius, height, segments));
    } {
      const radiusTop = 4;
      const radiusBottom = 4;
      const height = 8;
      const radialSegments = 12;
      addSolidGeometry(1, 2, new CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments));
    } {
      const radius = 7;
      addSolidGeometry(2, 2, new DodecahedronBufferGeometry(radius));
    } {
      const radius = 7;
      addSolidGeometry(-1, 1, new IcosahedronBufferGeometry(radius));
    } {
      const radius = 7;
      addSolidGeometry(1, 1, new OctahedronBufferGeometry(radius));
    } {
      const width = 9;
      const height = 9;
      const widthSegments = 2;
      const heightSegments = 2;
      addSolidGeometry(-2, 1, new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
    } {
      const radius = 7;
      const widthSegments = 12;
      const heightSegments = 8;
      addSolidGeometry(2, 1, new SphereBufferGeometry(radius, widthSegments, heightSegments));
    } {
      const radius = 7;
      addSolidGeometry(0, 1, new TetrahedronBufferGeometry(radius));
    } {
      const radius = 5;
      const tubeRadius = 2;
      const radialSegments = 8;
      const tubularSegments = 24;
      addSolidGeometry(-2, 0, new TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments));
    } {
      const radius = 3.5;
      const tube = 1.5;
      const radialSegments = 8;
      const tubularSegments = 64;
      const p = 2;
      const q = 3;
      addSolidGeometry(-1, 0, new TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q));
    } {
      const width = 8;
      const height = 8;
      const depth = 8;
      addLineGeometry(0, 0, new WireframeGeometry(new BoxBufferGeometry(width, height, depth)));
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }


}
