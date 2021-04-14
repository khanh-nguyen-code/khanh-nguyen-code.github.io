function makeRequest(method = "GET", url = "index.html") {
    // send a request and return a promise
    // tested for the default argument only
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request);
                } else {
                    reject(request);
                }
            }
        };
        request.open(method, url, true);
        request.send();
    });
}


function includeHTML() {
    // for all elements from this site
    // if they have "include-url", that is a html file
    // get that file and replace the element

    // how to use
    // <div class="include" url="navbar.html"></div>
    // content
    // <div class="include" url="footer.html"></div>
    // <script src="js/post_script.js"></script>
    //
    // result: navbar and footer are included before and after content

    const elements = document.getElementsByClassName("include");
    const promises = [];
    for (let i=0; i<elements.length; i++) {
        const element = elements[i];
        const url = element.getAttribute("url");
        promises.push(makeRequest("GET", url).then(function (data) {
            element.innerHTML = data.responseText;
        }));
    }
    return Promise.all(promises);
}

function highlightTab() {
    // highlight a tab name

    // how to use
    // <div id="highlight" name="about" ></div>
    //
    // result : if there is an element of id "about", its color will change to white
    return new Promise(function (resolve, reject) {
        const highlighter = document.getElementById("highlight");
        if (highlighter === null) {
            reject();
        }
        const elementId = highlighter.getAttribute("name");
        if (elementId === null) {
            reject();
        }
        const element = document.getElementById(elementId);
        if (element === null) {
            reject();
        }
        element.style.color = "white";
        resolve();
    });
}

includeHTML().then(highlightTab).catch(console.log);

