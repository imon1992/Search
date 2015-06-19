window.onload = function () {
    //var body = document.getElementById('id');
    //var buttonAddTr = document.createElement('button');
document.getElementById('addFieldToSearch').style.display='block'
    //buttonAddTr.style.display='block'
    //var searchTagP = document.createElement('p');
    //var cityP = document.createElement('p');
    //var buttonSendForm = document.createElement('button');
    //var searchTag = document.createElement('select');
    //var city = document.createElement('select');
    //var searchOption = document.createElement('option');
    //var searchOption2 = document.createElement('option');
    //var cityOption = document.createElement('option');
    //var cityOption2 = document.createElement('option');
    //var table = document.createElement('table');
    //var tbody = document.createElement('tbody');
    //var br = document.createElement('br');
    //var tr = document.createElement('tr');
    //var td1 = document.createElement('td');
    //var td2 = document.createElement('td');
    //body.appendChild(buttonAddTr);
    //document.body.firstElementChild.style.position='relative';
    //console.log(document.body.childNodes[2])
    //console.log(document.body.children[1])
    //console.log(document.getElementById('url'));
    //for (var i = 0; i < document.body.children.length; i++) {
    //    console.log( document.body.children[i] ); // DIV, UL, DIV, SCRIPT
    //}
    //body.appendChild(br);
    //body.appendChild(searchTag);
    //body.appendChild(searchTagP);
    //body.appendChild(city);
    //body.appendChild(cityP);

    //searchTagP.innerText = 'В каком разделе ищем'
    //searchTagP.style.display = 'inline';
    //cityP.innerText = 'В каком городе ищем';
    //cityP.style.display = 'inline';
    //body.appendChild(table);
    //body.appendChild(buttonSendForm);
    //table.appendChild(tbody);
    //tbody.appendChild(tr);
    //tr.appendChild(td1);
    //tr.appendChild(td2);
    //buttonAddTr.setAttribute('id', 'addFieldToSearch');
    //buttonAddTr.innerText = 'Добавить поля для поиска';
    //buttonSendForm.setAttribute('id', 'sendDataToSearch');
    //buttonSendForm.innerText = 'Отправить форму';
    //searchTag.setAttribute('id','searchTag');
    //searchTag.appendChild(searchOption);
    //searchTag.appendChild(searchOption2);
    //searchOption.innerText ='php';
    //searchOption2.innerText ='java';

    //city.setAttribute('id','city');
    //city.appendChild(cityOption);
    //cityOption.setAttribute('value','%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2');
    //cityOption2.setAttribute('value','%D0%9A%D0%B8%D0%B5%D0%B2&search');
    //city.appendChild(cityOption2);
    //cityOption.innerText = 'Николаев';
    //cityOption2.innerText = 'Киев';
    //searchTag.setAttribute('id','searchTag');
    //searchTag.style.width='900px';
    //searchTag.style.textOverflow='ellipsis';

    //
    //table.setAttribute('id', 'searchTable');
    //td1.innerText = 'Что ищем';
    //td1.setAttribute('align', 'center');
    //td2.innerText = 'Чего не должно быть';
    //td2.setAttribute('align', 'center');

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
        var searchTag = document.getElementById('searchTag').value;
        var city = document.getElementById('city').value;

        var searchLength = searchArray.length;
        var searchDataArray = new Array();
        searchDataArray[0] = new Array(searchTag,city);
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
            console.log(data)
            for(var val in data){
                //console.log(data[val]);
                //console.log(val);
                var div = document.createElement('div');
                document.body.appendChild(div);
                div.innerText = val +" : " + data[val];
            }
        }
        function consoleLogAjaxError(data){
            data = JSON.parse(data);
            //console.log(data.response);
            console.log(data);
        }
        var searchData = JSON.stringify(searchDataArray);
        console.log(searchData);
        waitingForResponse();
        ajax('ajaxHandlers/searchQueryHandler.php',
            showResult,
                true,
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

    function ajax(url, callback, type, method, params, header)
    {
        var xmlHttp = getXmlHttpRequest();
        xmlHttp.onreadystatechange=function(){
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
                callback(xmlHttp.response);
        }
        if(method=='POST') {
            xmlHttp.open(method, url, type);
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }else{
            url += '?'+ params;
            xmlHttp.open(method, url, type);
        }
        if(params!='') {
            xmlHttp.send(params);
        }else{
            xmlHttp.send(null);
        }
        }
    //    //return xmlHttp;    function ajax(url, callback, async, method, params, header)
    //{
    //    //console.log(url)
    ////console.log(callback)
    ////console.log(async)
    ////console.log(method)
    ////    console.log(params);
    //    var xmlHttp = getXmlHttpRequest();
    //    //console.log(params);
    //    xmlHttp.open(method, url, async);
    //
    //    if (method == 'GET') url += '?'+'searchParams=' +params;
    //    //console.log(url)
    //    //if (header != null) xmlHttp.setRequestHeader('Content-Type', header)
    //    if (method == 'POST')
    //    {
    //        xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //    }
    //
    //
    //    if (!async)
    //    {
    //        if (params == '')xmlHttp.send(null); else xmlHttp.send(params);
    //        //callback(xmlHttp.responseText);
    //    }
    //    else
    //    {
    //        xmlHttp.onreadystatechange = function() {
    //            if (xmlHttp.readyState == 4) {
    //                callback(xmlHttp);
    //            }
    //        };
    //        xmlHttp.send(null);
    //    }
    //    //return xmlHttp;
    //}

    function waitingForResponse(){
        var body = document.body;
            var children = body.childNodes;

            while(children.length) {
                body.removeChild(children[0]);
            }


    }

}
