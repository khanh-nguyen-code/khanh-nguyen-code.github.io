let server = null;
let admin_mode = false;
function sleep(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
    });
}
async function ping(addr) {
    const start = (new Date()).getTime();
    try {
        const response = await fetch(`http://${addr}/ping`);
    } catch (error) {
        return Infinity;
    }
    const end = (new Date()).getTime();
    return end-start;
}

async function findServer() {
    const response = await fetch("https://raw.githubusercontent.com/khanh-nguyen-code/go_util/master/cmd/dlog/config.json");
    const data = await response.json();
    let smallest = Infinity;
    for (let i=0; i<data.cluster.length; i++) {
        const addr = data.cluster[i].addr;
        const latency = await ping(addr);
        if (smallest === null || latency < smallest) {
            smallest = latency;
            server = addr;
        }
    }
    if (server != null) {
        console.log(`found nearest server ${server} with ping ${smallest}ms`);
    }
}

async function readLog() {
    let data = null;
    for (let i=0; i<5; i++) {
        if (server === null) {
            await findServer();
        }
        try {
            const response = await fetch(`http://${server}/log`);
            data = await response.json();
            break;
        } catch (error) {
            server = null;
            await sleep(1000);
        }
    }
    if (data == null) {
        alert("log is not available")
        return
    }
    data.reverse();
    let display = "";
    if (admin_mode) {
        display = "block";
    } else {
        display = "none";
    }
    let innerHTML = "";
    innerHTML += `<table>`
    data.forEach(function(line) {
        if (line.content.length === 0) {
            line.content = "_empty_";
        }
        let deleteButton = `<button class="delete" style="display:${display}" id="line_${line.number}" onclick="del(this.id)">delete</button>`;
        if (line.deleted) {
            deleteButton = "";
            line.content = "_deleted_";
        }
        innerHTML += `<tr>
        <td>${deleteButton}</td>
        <td style="width:100%"><div style="font-style:italic;text-align:left">${line.content.replace(/\n/g, "<br />")}</i><br>
        <div style="font-style:italic;font-size:small;text-align:right">from <b>${line.author}</b> at ${new Date(line.timestamp/1000000).toLocaleString()}</div></td>
        </tr>`
    });
    innerHTML += "</table>";
    const log = document.getElementById("log");
    log.innerHTML = innerHTML;
}

async function del(id) {
    if (server === null) {
        await findServer();
    }
    const line_number = parseInt(id.substring(5));
    const token = document.getElementById("token");
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://${server}/log`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token.value);
    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status != 200) {
                alert(`error ${this.status}: ${this.response}`)
            }
        }
    }
    xhr.send(JSON.stringify({
        line: line_number
    })); 
}

async function send() {
    if (server === null) {
        await findServer();
    }
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const token = document.getElementById("token");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://${server}/log`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token.value);
    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status != 200) {
                alert(`error ${this.status}: ${this.response}`)
            }
        }
    }
    xhr.send(JSON.stringify({
        author: author.value,
        content: content.value
    }));
    content.value = "";
}

async function toggle_admin() {
    if (admin_mode) {
        admin_mode = false;
    } else {
        admin_mode = true;
    }
    const token = document.getElementById("token");
    const deletes = document.getElementsByClassName("delete");
    if (admin_mode) {
        token.style.display = "block";
        for (let i=0; i<deletes.length; i++) {
            deletes[i].style.display = "block";
        }
    } else {
        token.style.display = "none" 
        for (let i=0; i<deletes.length; i++) {
            deletes[i].style.display = "none";
        }
    }
}

async function main() {
    setInterval(readLog, 1000);
}

main()
