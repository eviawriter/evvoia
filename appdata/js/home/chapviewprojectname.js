const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./appdata/resources/protodatabase.evv');

var rows = document.getElementById("projectname");
db.each("SELECT Projectname FROM Project", function(err,row) {
  var item = document.createElement("p");
  item.setAttribute("id", "projecttitle");
  item.setAttribute("onmouseover", "this.style.color='#339999'; this.style.textDecoration='underline'");
  item.setAttribute("onmouseout", "this.style.color='#414040'; this.style.textDecoration='none'");
  item.setAttribute("onclick","{ alert('You are not going to believe this!') } ");
  item.textContent = "Project: " + row.Projectname;
  rows.appendChild(item);
});