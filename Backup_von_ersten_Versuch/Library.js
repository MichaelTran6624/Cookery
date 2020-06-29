var url = 'http://localhost:3000/';

function initialize() {
  var select_myselect = document.getElementById("myselect").value = "";
  var search = document.getElementById("search").value = "";
  var title = document.getElementById("title").value = "";
  var picture = document.getElementById("picture").value = "";
  var ingredients = document.getElementById("ingredients").value = "";
  var description = document.getElementById("description").value = "";

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
  title = document.getElementById("title").value = "";
  picture = document.getElementById("picture").value = "";
  ingredients = document.getElementById("ingredients").value = "";
  description = document.getElementById("description").value = "";
}

function change_myselect(sel) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
  var newurl = url + sel;
  obj = { table: sel, limit: 20 };
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        txt += "<table border=2>"
        txt += "<tr><td><img src=\"" + myObj[x].picture + "\"></tr></td><tr><td>Name<br>" + myObj[x].nameOfDish + "</td></tr><tr><td>Ingredients<br>" + myObj[x].ingredients + "</td></tr><br><tr><td>Description<br>" + myObj[x].description + "</td></tr><br>";
        txt += "</table>";
      }
      document.getElementById("demo").innerHTML = txt;
    }
  };
  xmlhttp.open('GET', newurl,true); 
  xmlhttp.send();
}
function filter(){
  var obj, dbParam, xmlhttp, myObj, x,txt = "";
  var newurl = url + document.getElementById("myselect").value;
  var ingredient = document.getElementById("search").value;
  obj = { table: sel, limit: 20 };
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        if(myObj[x].ingredients.includes(ingredient)){   
          txt += "<table border=2>"
          txt += "<tr><td><img src=\"" + myObj[x].picture + "\"></tr></td><tr><td>Name<br>" + myObj[x].nameOfDish + "</td></tr><tr><td>Ingredients<br>" + myObj[x].ingredients + "</td></tr><br><tr><td>Description<br>" + myObj[x].description + "</td></tr><br>";
          txt += "</table>";
        }
      }
      document.getElementById("demo").innerHTML = txt;
    }
  };
  xmlhttp.open('GET', newurl,true); 
  xmlhttp.send();
}