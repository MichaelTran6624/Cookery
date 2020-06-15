var url = 'http://localhost:3000/';

function initialize() {
  var select_myselect = document.getElementById("myselect");

  select_myselect.selectIndex = 0;
}

function submit(){
    var myselect = document.getElementById("myselect");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var picture = document.getElementById("picture");
    var ingredient = document.getElementById("ingredients");
    var http = new XMLHttpRequest();
    var newurl = url + myselect.value;
    http.open('POST', newurl, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            alert(http.responseText);
        }
    }

    var data = "nameOfDish=" + title.value + "&description=" + description.value + "&picture=" + picture.value + "&ingredients=" + ingredients.value;
    http.send(data);
}

function change_myselect(sel) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
  var newurl = url + sel;
  obj = { table: sel, limit: 20 };
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      txt += "<table border='1'>"
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        txt += "<tr><td><img src=\"" + myObj[x].picture + "\"></tr></td><tr><td>" + myObj[x].nameOfDish + "</td></tr><tr><td>" + myObj[x].description + "</td></tr>";
      }
      txt += "</table>";
      document.getElementById("demo").innerHTML = txt;
    }
  };
  xmlhttp.open('GET', newurl,true); 
  xmlhttp.send();
}

function filter_by_ingredient(input){
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
  var newurl = url + sel;
  obj = { table: sel, limit: 20 };
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      txt += "<table border='1'>"
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        if(myObj[x].ingredient.includes(input)){
          txt += "<tr><td><img src=\"" + myObj[x].picture + "\"></tr></td><tr><td>" + myObj[x].nameOfDish + "</td></tr><tr><td>" + myObj[x].description + "</td></tr>";
        }
      }
      txt += "</table>";
      document.getElementById("demo").innerHTML = txt;
    }
  };
    xmlhttp.open('GET', newurl,true); 
    xmlhttp.send();
}