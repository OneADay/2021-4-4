import * as THREE from 'three';

const WIDTH: number = 1920 / 2;
const HEIGHT: number = 1080 / 2;

const COLORS = [0xA84762, 0xF5EC78];

export default class ThreeRenderer{
    
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    mesh: THREE.Mesh;
    renderer: THREE.Renderer;
    group: THREE.Object3D;

    constructor(canvas: HTMLCanvasElement) {
        this.camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 0.01, 10 );
        this.camera.position.z = 1;
    
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( COLORS[0] );

        let geometry = new THREE.ConeGeometry( 0.2, 0.2, 3 );
        let material = new THREE.MeshBasicMaterial({color: COLORS[1]});
    
        this.group = new THREE.Object3D();
        for (let i = 0; i < 5000; i++) {
            let mesh = new THREE.Mesh( geometry, material );
            this.group.add(mesh);
        }

        this.scene.add( this.group );
    
        this.renderer = new THREE.WebGLRenderer( { 
            canvas: canvas, 
            antialias: true
        } );
        this.renderer.setSize( WIDTH, HEIGHT );
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }
}