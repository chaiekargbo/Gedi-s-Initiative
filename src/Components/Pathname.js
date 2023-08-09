import {
    pages
} from '../Pages.js';

export default function Pathname() {
    //regex to rm / and .html
    let reg = /\/|\.html/g;
    let page = window.location.pathname.replace(reg, '');
    //if page isnt in pages, set to home
    if (!pages.includes(page)) {
        window.location.pathname = '/home.html';
        page = 'home';
    }
    return page;
}