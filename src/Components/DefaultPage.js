import { 
    pageENG, pagePIG, pageTST
} from '../Pages.js';

export default function DefaultPage(page) {
    //title
    const title = document.querySelector('title');

    title.classList.add('lang');
    
    title.addEventListener('languageSwitch', (e) => {
        if (e.detail.language === 'ENG') {
            document.title = pageENG[page];
        } else if (e.detail.language === 'PIG') {
            document.title = pagePIG[page];
        } else if (e.detail.language === 'TST') {
            document.title = pageTST[page];
        }
    });

    //tx
    const tx = document.getElementById('txt');

    tx.classList.add('lang');

    tx.addEventListener('languageSwitch', (e) => {
            import(`../Pages/${page}/${page}${e.detail.language}.txt`).then((module) => {
                tx.innerHTML = module.default;
            }
        );
    });

    tx.dispatchEvent(new CustomEvent('languageSwitch', {detail: {language: 'ENG'}}));
    
    //main img
    const main = document.getElementById('main');

    var img = document.createElement('img');

    img.classList.add('main-img');
    img.src = require(`../Pages/${page}/${page}.jpg`).default;

    main.appendChild(img);
}