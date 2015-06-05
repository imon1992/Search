window.onload = function () {
    var body = document.getElementById('id');
    var buttonAddTr = document.createElement('button');
    buttonAddTr.style.display='block'
    var p = document.createElement('p');
    var buttonSendForm = document.createElement('button');
    var inputURL = document.createElement('input');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    //var br = document.createElement('br');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    body.appendChild(buttonAddTr);
    //document.body.firstElementChild.style.position='relative';
    //console.log(document.body.childNodes[2])
    //console.log(document.body.children[1])
    //console.log(document.getElementById('url'));
    //for (var i = 0; i < document.body.children.length; i++) {
    //    console.log( document.body.children[i] ); // DIV, UL, DIV, SCRIPT
    //}
    //body.appendChild(br);
    body.appendChild(inputURL);
    body.appendChild(p);
    p.innerText = 'Ссылка где ищем'
    p.style.display = 'inline';
    body.appendChild(table);
    body.appendChild(buttonSendForm);
    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    buttonAddTr.setAttribute('id', 'addFieldToSearch');
    buttonAddTr.innerText = 'Добавить поля для поиска';
    buttonSendForm.setAttribute('id', 'sendDataToSearch');
    buttonSendForm.innerText = 'Отправить форму';
    inputURL.setAttribute('id','url');
    inputURL.style.width='900px';
    //inputURL.style.textOverflow='ellipsis';

    //
    table.setAttribute('id', 'searchTable');
    td1.innerText = 'Что ищем';
    td1.setAttribute('align', 'center');
    td2.innerText = 'Чего не должно быть';
    td2.setAttribute('align', 'center');

    //console.log(document.getElementById('url').style.position='absolute');
    document.getElementById('addFieldToSearch').onclick = addFields;
    document.getElementById('sendDataToSearch').onclick = getAndSendSearchData;
    function addFields() {
        //var objectNumber = addFieldObj.idCount(addFieldObj.id + 1);

        var searchTable = document.getElementById('searchTable');
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        //var td3 = document.createElement('td');
        var button = document.createElement('button');
        var input1 = document.createElement('input');
        var input2 = document.createElement('input');
        var tbody = searchTable.getElementsByTagName('tbody')[0];
        tbody.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        //tr.appendChild(td3);
        td2.appendChild(button);
        td1.appendChild(input1);
        //var idNumber = searchObject.id;
        //searchObject.idCount(idNumber + 1);
        //td2.appendChild(input2);
        button.innerText = 'Добавление колонки для того чего быть не должно';
        button.setAttribute('id', 'addNotPresentedField');
        button.style.width = '150px';
        td1.setAttribute('height', '50');
        td2.setAttribute('height', '50');
        addButtonAction();
    }

    //var searchObject = {
    //    id: 0,
    //    idCount: function (id) {
    //        this.id = id;
    //    }


    function addButtonAction() {
        var searchTable = document.getElementById('searchTable').children[0];
        var trCount = searchTable.childNodes.length;
        for (i = 1; i < trCount; i++) {
            searchTable.rows[i].lastChild.onclick = addNotPresentedField;
        }
    }

//
    function addNotPresentedField() {
        var tr = this.parentElement;
        var td = document.createElement('td');
        td.setAttribute('height', '50');
        var input = document.createElement('input');
        tr.insertBefore(td, this);
        td.appendChild(input);
    }

    function getAndSendSearchData() {
        var searchArray = getSearch();
        var notPresentedArray = getNotPresented();
        var url = document.getElementById('url').value;

        var searchLength = searchArray.length;
        var searchDataArray = new Array();
        searchDataArray[0] = url;
        for (i = 0; i < searchLength; i++) {
            searchDataArray[i+1] = {
                "name": searchArray[i],
                "search": new Array(),
                "notPresented": new Array()
            };
            searchDataArray[i+1].search[0] = {"name": searchArray[i]};
            var notPresentedLength = notPresentedArray[i].length;
            searchDataArray[i+1].notPresented[0] = {};
            for (j = 0; j < notPresentedLength; j++) {
                var name = 'name' + j;
                searchDataArray[i+1].notPresented[0][name] = notPresentedArray[i][j];
            }
        }

        function showResult(data){
            data = JSON.parse(data);
            //console.log(data)
            for(var val in data){
                //console.log(data[val]);
                //console.log(val);
                var div = document.createElement('div');
                document.body.appendChild(div);
                div.innerText = val +" : " + data[val];
            }
        }
        var searchData = JSON.stringify(searchDataArray);
        waitingForResponse();
        ajax('ajaxHandlers/searchQueryHandler.php',
            showResult,
                false,
                'POST',searchData);
    }

    function getSearch() {
        var searchTableTbody = document.getElementById('searchTable').children[0];
        var tbody = searchTableTbody.children;
        var trCount = searchTableTbody.childNodes.length;
        var searchArray = new Array();
        for (var i = 0; i < trCount; i++) {
            if (i != 0) {
                searchArray[i - 1] = tbody[i].children[0].children[0].value;
            }
        }
        //console.log(searchArray[0]);
        return searchArray;
    }

    function getNotPresented() {
        var searchTableTbody = document.getElementById('searchTable').children[0];
        var tbody = searchTableTbody.children;
        var trCount = searchTableTbody.childNodes.length;
        var notPresentedArray = new Array();
        for (i = 1; i < trCount; i++) {
            notPresentedArray[i - 1] = new Array();
            var tdInTrCount = tbody[i].children.length - 1;
            for (j = 1; j < tdInTrCount; j++) {
                var notPresented = tbody[i].children[j].children[0].value;
                notPresentedArray[i - 1][j - 1] = notPresented;
            }
        }
        return notPresentedArray;
    }

    function ajax(url, callback, async, method, params, header)
    {
        //console.log(url)
    //console.log(callback)
    //console.log(async)
    //console.log(method)
    //    console.log(params);
        var xmlHttp = getXmlHttpRequest();
        async = async || false;

        params = params || '';
        method = method || 'GET';
        //console.log(params);

        if (method == 'GET') url += '?'+'searchParams=' +params;
        //console.log(url)
        if (header != null) xmlHttp.setRequestHeader('Content-Type', header)
        else if (method == 'POST')
        {
            //xmlHttp.setRequestHeader('"Content-Type: text/html;');
            //header = 'application/x-www-form-urlencoded';
            //xmlHttp.setRequestHeader('Content-Type', header)
            //xmlHttp.responseType = 'json';
        }

        xmlHttp.open(method, url, async);

        if (!async)
        {
            if (params == '')xmlHttp.send(null); else xmlHttp.send(params);
            callback(xmlHttp.responseText);
        }
        else
        {
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    callback(xmlHttp);
                }
            };
            xmlHttp.send(null);
        }
        //return xmlHttp;
    }

    function waitingForResponse(){
        var body = document.body;
            var children = body.childNodes;

            while(children.length) {
                body.removeChild(children[0]);
            }


    }

}
