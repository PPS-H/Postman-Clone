console.log("Kaka")


let paramsCount = 0

function getElementFromString(params) {
    let div = document.createElement('div')
    div.innerHTML = params
    return div.firstElementChild
}
let parameters = document.getElementById('paramtersBox')
parameters.style.display = 'none'


document.getElementById('jsonRadio').addEventListener('click', () => {
    document.getElementById('paramtersBox').style.display = 'none'
    document.getElementById('jsonBox').style.display = 'flex'
})

document.getElementById('paramsRadio').addEventListener('click', () => {
    document.getElementById('paramtersBox').style.display = 'block'
    document.getElementById('jsonBox').style.display = 'none'
})


document.getElementById('addBtn').addEventListener('click', () => {
    let element = document.getElementById('params')
    let string = `<div class="mb-3 row my-3">
                <label for="params" class="col-sm-2 col-form-label">Parameter ${paramsCount+2}</label>
                <div class="col-sm-4">
                    <input type="params" class="form-control" id="key${paramsCount+2}" placeholder="Enter key">
                </div>

                <div class="col-sm-4">
                    <input type="params" class="form-control" id="value${paramsCount+2}" placeholder="Enter value">
                </div>
                <button class="btn btn-primary col-sm-1 delBtn">-</button>
            </div>`
    let content = getElementFromString(string)
    document.getElementById('params').append(content)

    let delBtn = document.getElementsByClassName('delBtn')
    for (item of delBtn) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }
    paramsCount++
})

document.getElementById('submit').addEventListener('click', () => {
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='TypeOfRequest']:checked").value
    let contentType = document.querySelector("input[name='responseRequest']:checked").value
    if (contentType == 'params') {
        data = {}
        for (i = 0; i < paramsCount + 1; i++) {
            if (document.getElementById(`key${i + 1}`) != undefined) {
                let key = document.getElementById(`key${i + 1}`).value
                let value = document.getElementById(`value${i + 1}`).value
                data[key] = value
            }
        }
        data = JSON.stringify(data)
    } else {
        data = document.getElementById('requestTxt').value
    }

    if (requestType == 'get') {
        fetch(url, {
                method: 'GET'
            }).then(response => response.text())
            .then(text => {
                document.getElementById('response').value = text
            })
    } else {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.text())
            .then(text => {
                document.getElementById('response').value = text
            })
    }
})