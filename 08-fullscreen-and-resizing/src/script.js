import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrthographicCamera } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    // new THREE.MeshBasicMaterial({ color: 0xff0000 })
    new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
    })
)
scene.add(mesh)

// Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000)

let aspectRatio = sizes.width/sizes.height
const camera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2, 1, 1000)
// const camera = new THREE.OrthographicCamera(-2, 2, 2 * (1/aspectRatio), -2 * (1/aspectRatio), 1, 1000)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Lighting
const ambientLight = new THREE.AmbientLight(0x85b4ff)
scene.add(ambientLight)

const dirLight01 = new THREE.DirectionalLight(0xfcba03, .5)
dirLight01.position.set(1, 1, 0)
scene.add(dirLight01)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const orbitControl = new OrbitControls(camera, canvas)
// orbitControl.target.y = 2
orbitControl.enableDamping = true
orbitControl.dampingFactor = .2
// orbitControl.autoRotate = true

// Resize
window.addEventListener('resize', (event) => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update perspective camera
    // camera.aspect = sizes.width/sizes.height
    // camera.updateProjectionMatrix()

    // Update ortho camera
    aspectRatio = sizes.width/sizes.height
    camera.left = -2 * aspectRatio
    camera.right = 2 * aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // handle multi screens occasion
})

// Full Screen
window.addEventListener('dblclick', (event) => {
    if (!document.fullscreenElement)
    {
        canvas.requestFullscreen()
        console.log(document.fullscreenElement)
    }
    else
    {
        document.exitFullscreen()
        console.log(document.fullscreenElement)
    }
})

// Mouse
let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / sizes.width - .5
    mouseY = - (event.clientY / sizes.height - .5)
})

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = mouseX * 5
    // camera.position.y = mouseY * 5

    // camera.position.x = Math.sin(mouseX * Math.PI * 2) * 3
    // camera.position.z = Math.cos(mouseX * Math.PI * 2) * 3
    // camera.position.y = mouseY * 5
    // camera.lookAt(mesh.position)

    // Update Controls
    orbitControl.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()