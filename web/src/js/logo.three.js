// Set up the scene, camera, and renderer as global variables.
var scene, camera, renderer;

var sphere,sphere2,light;

// Sets up the scene.
function init(callback) {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(20,20,0);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    // Set the background color of the scene.
    renderer.setClearColor("#003437", 1);

    // Create a light, set its position, and add it to the scene.
    light = new THREE.PointLight("#ffffff");
    light.position.set(-100,200,100);
    scene.add(light);

    // Create sphere and add it to scene
    var geometry = new THREE.SphereGeometry(5,30,33);
    var material = new THREE.MeshBasicMaterial({
            color:"#006E6E",
            wireframe:true
    });
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    var material2 = new THREE.MeshPhongMaterial({
        color:"#FF0046",
        wireframe:false
    });
    sphere2 = new THREE.Mesh(geometry.clone(), material2);
    scene.add( sphere2 );

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    if(typeof callback === "function"){
        callback();
    }

}


function spinObj(obj,speed) {
    obj.rotation.y += speed;
}


var angle=0;
function moveObj(obj,speed) {
    angle += speed;
    obj.position.x = 300 * Math.sin( angle );
    console.log( obj.position.x)
}


// Renders the scene and updates the render as needed.
function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();

    /*camera.position.x = radius * Math.cos( angle );
    camera.position.z = radius * Math.sin( angle );
    angle += 0.01;*/

    spinObj(sphere,0.01);
    spinObj(sphere2,0.01);
    moveObj(light,0.02);
}