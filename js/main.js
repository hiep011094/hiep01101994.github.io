

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer({
//     antialias:true
// });
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio(window.devicePixelRatio);
// // renderer.autoClear = false;
// // renderer.setClearColor(0x000000,0.0);

// const controls = new THREE.OrbitControls( camera, renderer.domElement );


// const geometry = new THREE.SphereGeometry( 4, 50, 50 );
// const material = new THREE.MeshPhongMaterial( { 
//     roughness:1,
//     metalness:0,
//     map: new THREE.TextureLoader().load('img/map.webp'),
// } );

// const cube = new THREE.Mesh( geometry, material );

// // scene.add( cube );

// const starGeomtry = new THREE.SphereGeometry(100,64,64);

// const startMaterial = new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load('img/Layer 0.jpg'),
//     side: THREE.BackSide,
// });

// const starMesh = new THREE.Mesh(starGeomtry,startMaterial);

// scene.add( starMesh );

// camera.position.z = 10;

// const ambientLight = new THREE.AmbientLight(0xffffff,0.2);
// scene.add( ambientLight );

// const pointLight = new THREE.PointLight('0xffffff,1');

// pointLight.position.set(5,3,5);

// scene.add( pointLight );
// // controls.update();
// function animate() {
// 	requestAnimationFrame( animate );
//     cube.rotation.y -=0.0015;
//     controls.update();
// 	renderer.render( scene, camera );
// }
// animate();

// document.body.appendChild( renderer.domElement );

        
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from './orbitControls.js';
import { DragControls } from './DragControls.js';

let scene,camera, renderer, starGeo,star,stars,vertices = [],velocities  = [],accelerations  = [],geometry,sphere,controls, more;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });
    
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor('0x000000');
    

    document.body.appendChild(renderer.domElement);

    
    const points = []

    starGeo = new THREE.BufferGeometry();


    for (let i = 0; i < 6000; i++){
        vertices.push( Math.random() * 800 - 400 ); // x
        vertices.push( Math.random() * 800 - 400 ); // y
        vertices.push( Math.random() * 800 - 400 ); // z

        velocities.push( 0 );
        accelerations.push( Math.random() );
            
    }
    starGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    let sprite = new THREE.TextureLoader().load('img/star.png');
    let starMaterial = new THREE.PointsMaterial({
        color:0xaaaaaa,
        size:0.5,
        map:sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);

    scene.add(stars);

    //-----------------

    geometry = new THREE.SphereGeometry( 0.6, 32, 32 );
    const material = new THREE.MeshPhongMaterial( {
        roughness:1,
        metaness:0,
        map: new THREE.TextureLoader().load('./img/map.jpg')
     } );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    const ambientLight = new THREE.AmbientLight(0xffffff,0.2);
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight(0xffffff,1);
    scene.add( pointLight );
    pointLight.position.set(5,2,5);
    
    // console.log(sphere.rotation);

    // more = new DragControls([sphere], camera, renderer.domElement ); 
    controls = new OrbitControls( camera, renderer.domElement ); 
    
    console.log(controls.dispose.prototype);
    // controls.update();
    animate();    
}

function animate(){

    
    const p = starGeo.getAttribute('position');

    for ( let i = 0; i < p.count; i ++ ) {
        var z = p.getZ( i );      
        var vel = velocities[ i ];
        var accel = accelerations[ i ];
        vel += accel;
        z += vel;
        velocities[ i ] = 5;
        if(z > 300){
            z = -300;
            vel = 0;
        }    
        p.setZ( i, z );        
    
    }
    
    p.needsUpdate  = true;
    stars.position.y += 0.1;

    sphere.rotation.y -= 0.002;

    // controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
init();

