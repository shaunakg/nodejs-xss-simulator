var text_field = document.getElementById("text-field");
    var tgh = document.getElementById('tgh');
    var renderHTML = document.getElementById("renderAsHTML");

    tgh.innerText = "--";

    renderHTML.oninput = function () {
        if (renderHTML.checked) {
            tgh.innerHTML = tgh.innerText;
        } else {
            tgh.innerText = tgh.innerHTML;
        }
    };

    text_field.oninput = function () {
        
        if (renderHTML.checked) {
            tgh.innerHTML = text_field.value;
        } else {
            tgh.innerText = text_field.value;
        }

        socket.emit('ctfc', text_field.value);

    };

    socket.on('stfc', function (new_text) {
        text_field.oninput = undefined;

        if (renderHTML.checked) {
            tgh.innerHTML = new_text;
        } else {
            tgh.innerText = new_text;
        }

        text_field.value = new_text;
        text_field.oninput = function () {
            socket.emit('ctfc', text_field.value);
        };
    });