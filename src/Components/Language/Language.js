import './Language.css'

export const languages = [
    'ENG',
    'TST',
    'PIG',
]

export var language;

if (language === undefined) {
    language = languages[0];
}

export function LanguageButton() {
    const container = document.createElement('div'); //style container
    const contLang = document.createElement('div'); //label that says 'switch language'
    const sw = document.createElement('button'); //button that switches language and says 'current language'

    container.classList.add('language-container');

    contLang.classList.add('language-label');
    contLang.classList.add('lang');
    contLang.innerText = 'Switch Language';

    sw.classList.add('language-switch');
    sw.classList.add('lang');
    sw.innerText = language;
    
    sw.addEventListener('click', LanguageSwitch);

    sw.addEventListener('languageSwitch', (e) => {
        console.log(e.detail.language);
        sw.innerText = e.detail.language;
    });

    contLang.addEventListener('languageSwitch', (e) => {
        import(`./Language${e.detail.language}.txt`).then((tx) => {
            contLang.innerText = tx.default;
        });        
    });

    container.appendChild(contLang);
    container.appendChild(sw);
    
    return container;
}

function LanguageSwitch(e) {    
    language = languages[(languages.indexOf(language) + 1) % languages.length];
    //gets all elements with lang class and fires event
    document.querySelectorAll('.lang').forEach((e) => {
        e.dispatchEvent(new CustomEvent('languageSwitch', {
            detail: {
                language: language
            }
        }));
    });
}