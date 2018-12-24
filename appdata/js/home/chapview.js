db.serialize(() => { 

// Variabele 'rows' connected to <div id="database">
var rows = document.getElementById("database");

// Variabele 'chapname' gets info from database
var chapname = [];

// Get chapname from database and push it to var chapname
db.each("SELECT DISTINCT chapname FROM Chapters ORDER BY chaporder", function(err,row) 
  { 
    if (err) 
    {console.log('ERROR!', err);}   
  
    else {
    chapname.push(row.chapname);
    // console.log(row);   
    }
  
  });
  
// Node is asynchronous, so the push thingy doesn't work yet
// For each chapname from variable 'chapname', create elements and put them together
// with subnames to the corresponding chapname. Work in progress

// Set timeout
setTimeout(() => { 

// For each var chapname, do...
chapname.forEach(function(chapname)
{ 

  // Code start hier
  db.all("SELECT subname FROM chaptree WHERE (chapname='" + chapname + "') ORDER BY suborder", function(err,row)
    {   
      //  Error reporting
      if (err) 
      {console.log('ERROR!', err)}    
   
      // No error? Then we do the stuff
      else { 
      
        // first we create titlestuff  
        var item = document.createElement("p");
        item.setAttribute("id", "chaptertitle");
        item.textContent = chapname;
        rows.appendChild(item);
      
        // then we create subtitlestuff
        row.forEach(function(row) {
        var subchapname = document.createElement("p");
        subchapname.setAttribute("id", "subchaptertitle");
        subchapname.textContent = row.subname;
        rows.appendChild(subchapname);
             
      
        });
      };
    });
// Code eindigt hier

})},500);

});

setTimeout(() => { db.close(); }, 1000);