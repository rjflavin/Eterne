export const scrollbarWidth = () => {
    let documentWidth = parseInt(document.documentElement.clientWidth);
    let windowsWidth = parseInt(window.innerWidth);
    return windowsWidth - documentWidth;
}