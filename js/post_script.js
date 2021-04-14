function include(cb) {
    // for all elements from this site
    // if they have "include-url", that is a html file
    // get that file and replace the element

    // how to use
    // <div include-url="navbar.html"></div>
    // content
    // <div include-url="footer.html"></div>
    // <script src="js/post_script.js"></script>

    const z = document.getElementsByTagName("*");
    for (let i = 0; i < z.length; i++) {
        const elem = z[i];
        const url = elem.getAttribute("include-url");
        if (url) {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    elem.innerHTML = this.responseText;
                    elem.removeAttribute("include-url");
                    include(cb);
                }
            };
            request.open("GET", url, true);
            request.send();
        }
    }
    if (cb)
        cb();
}

include();