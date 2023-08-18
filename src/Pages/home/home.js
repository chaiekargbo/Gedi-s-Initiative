import './home.css';

import { 
    pages, pageENG, pagePIG, pageTST
} from '../../Pages.js';

import {
    Card
} from '../../Components/Card/Card.js';

function homePage() {

    if (window.mobileCheck()) {
        document.getElementById('cardContainer').classList.add('cardContainer-mobile');
    }
    
    import('../../Components/Logo/Logo.js').then(module => {
        let logo = module.default();
        document.getElementById('main').prepend(logo);
    });

    for (let page of pages) {
        if (page === 'home') continue;
        //get page summary
        const img = require(`../../Pages/${page}/${page}.jpg`).default;
        const txt = require(`../../Pages/${page}/summaryENG.txt`);
        
        const card = Card(page, pageENG[page], txt.default, img);

        card.classList.add('lang')

        card.addEventListener('languageSwitch', (e) => {
            //needs to get container <h4><b>innerText</b></h4> title
            //and <p>innerText</p> body
            //id will be page

            const ct = card.children[0];

            if (e.detail.language === 'ENG') {
                ct.children[0].children[0].innerText = pageENG[page];
                import(`../../Pages/${page}/summaryENG.txt`).then(module => {
                    ct.children[1].innerText = module.default;
                });
            } else if (e.detail.language === 'PIG') {
                ct.children[0].children[0].innerText = pagePIG[page];
                import(`../../Pages/${page}/summaryPIG.txt`).then(module => {
                    ct.children[1].innerText = module.default;
                });
            } else if (e.detail.language === 'TST') {
                ct.children[0].children[0].innerText = pageTST[page];
                import(`../../Pages/${page}/summaryTST.txt`).then(module => {
                    ct.children[1].innerText = module.default;
                });
            }
        });   

        document.getElementById('cardContainer').appendChild(card);
    }

    let head = document.getElementById('header');
    head.innerHTML = require(`./homeENG.txt`).default;
    head.classList.add('lang');
    head.addEventListener('languageSwitch', (e) => {
        import(`./home${e.detail.language}.txt`).then(module => {
            head.innerHTML = module.default;
        });
    });

}

homePage();