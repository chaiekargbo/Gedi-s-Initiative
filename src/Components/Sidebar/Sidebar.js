import './Sidebar.css';

import {
    pages, pageENG, pagePIG, pageTST
} from '../../Pages.js';

import {
    LanguageButton
} from '../Language/Language.js';

/*
//sidebar
<div id="sidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="clients.html">Clients</a>
    <a href="contact.html">Contact</a>
</div>
//sidebar button
<span id="menuBT" class="menuBT">Menu</span>
*/

export default function Sidebar(current = undefined) {
    //remove current page from pages if defined
    if (current) {
        pages.splice(pages.indexOf(current), 1);
    }
    //returns a sidebar element
    const sidebar = document.createElement('div');
    sidebar.id = 'sidenav';
    sidebar.className = 'sidenav';
    sidebar.innerHTML = `<a href="javascript:void(0)" class="closebtn lang" id="closeNav">&times;</a>`;


    // `<a href="javascript:void(0)" class="closebtn lang" id="closeNav">&times;</a>
    // ${pages.map(page => `<a href="${page}.html">${page}</a>`).join('')}
    // `

    pages.forEach(page => { 
        const a = document.createElement('a');
        a.className = 'lang';
        a.innerHTML = pageENG[page];
        a.href = `${page}.html`;
        a.addEventListener('languageSwitch', (e) => {
            if (e.detail.language == 'ENG') {
                //use href to get page name
                a.innerHTML = pageENG[page];
            } else if (e.detail.language == 'PIG') {
                a.innerHTML = pagePIG[page];
            } else if (e.detail.language == 'TST') {
                a.innerHTML = pageTST[page];
            }
        });
        sidebar.appendChild(a);
    });

    const closeBT = sidebar.children[0];
    closeBT.addEventListener('click', closeNav);

    const menuBT = SidebarButton();
    menuBT.addEventListener('click', openNav);

    const lb = LanguageButton();
    sidebar.appendChild(lb);

    document.getElementById('main').prepend(menuBT);
    document.body.prepend(sidebar);

    return sidebar;
}

function SidebarButton() {
    //returns a sidebar button element
    const sidebarButton = document.createElement('span');
    sidebarButton.id = 'menuBT';
    sidebarButton.className = 'menuBT';
    sidebarButton.classList.add('lang')
    sidebarButton.addEventListener('languageSwitch', (e) => {
        import(`./Menu${e.detail.language}.txt`).then((tx) => {
            sidebarButton.innerHTML = tx.default;
        });
    });       
    sidebarButton.innerHTML = `Menu`;
    return sidebarButton;
}


function openNav() {
    document.getElementById("menuBT").style.display = "none";
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("menuBT").style.display = "block";
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
