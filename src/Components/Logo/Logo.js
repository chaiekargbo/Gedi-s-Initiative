/* <div class="logocontainer">
    <img id="logo" alt="Gedi's Initiative Logo" class="logo">
</div> */

import './Logo.css'
import img from './logo.jpg'

export default function Logo() {
    let container = document.createElement('div')
    container.classList.add('logocontainer')
    let logo = document.createElement('img')
    logo.classList.add('logo')
    logo.src = img
    container.appendChild(logo)
    return container
}