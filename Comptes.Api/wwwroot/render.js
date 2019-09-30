let guard = 0;

let renderers = [];
function addRenderer(predicate, func) {
    renderers.push({ predicate: predicate, func: func })
}

function render(x, h) {
    //console.log("render " + h);
    guard++;
    if (guard > 1000) {
        console.log("GUARD TOO MANY CALLS : " + guard);
        return "";
    }

    if (x == null)
        return 'null';
    let found = null;
    for (let renderer of renderers) {
        if (renderer.predicate(x, h))
            found = renderer;
    }
    return found.func(x, h);
}

function renderArrayAsList(x, h) {
    let html = `<ul>`;
    for (let elt of x)
        html += "<li>" + render(elt, h + '.[]') + '</li>';
    html += "</ul>"
    return html;
}


function renderObjectAsList(x, h) {
    let html = `<ul>`;
    let keys = Object.keys(x);
    for (let k of keys)
        html += `<li>${k} : ${render(x[k], h + '.' + k)}</li>`;
    html += "</ul>"
    return html;
}

function field(h) {
    let split = h.split('.');
    let f = split[split.length - 1];
    return f;
}

function renderForm(x, h) {
    return `<form class = "${h}">
                ${renderInputs(x, h)}
                <button  type="submit" class="btn btn-primary">${field(h)}</button>
            </form>`;
}

function renderInputs(form, h) {
    let html = '';
    let keys = Object.keys(form.Command);
    for (let k of keys) {
        //console.log('    input : ' + k);
        html += `<div class="form-group">
                    <label for="${k}">${k}</label>
                    <input class="form-control" id="${h}.${k}" class="${h}.${k}"></input>
                </div>`;
    }
    return html;
}

function href(x) {
    return x['href'].replace('/api', '');
}

addRenderer(
    (x, h) => typeof (x) == 'object',
    (x, h) => renderObjectAsList(x, h));
addRenderer(
    (x, h) => Array.isArray(x),
    (x, h) => renderArrayAsList(x, h));
addRenderer(
    (x, h) => typeof (x) == 'string',
    (x, h) => `${x}`);
addRenderer(
    (x, h) => x["IsAsyncCall"],
    (x, h) => {
        addAsyncCall(x, h);
        return `<div class="${h}"></div>`;
    });
addRenderer(
    (x, h) => x["IsForm"],
    (x, h) => {
        addForm(x, h);
        return renderForm(x, h)
    });
addRenderer(
    (x, h) => x["href"],
    (x, h) => `<a href="${href(x)}"> ${field(h)} </a><br/>`);
addRenderer(
    (x, h) => x.IsSvg,
    (x, h) => `${field(h)} :<br/> ${x.Svg}`);



