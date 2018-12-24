// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./appdata/resources/protodatabase.evv');


// Add fonts to whitelist
var Font = Quill.import('formats/font');

// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['Ubuntu', 'sans-serif', 'monospace'];

Quill.register(Font, true);
                  
// Delta for autosave                
var Delta = Quill.import('delta');

var editor = new Quill('#editor', 
    {
    modules: { toolbar: '#toolbar' },
    placeholder: 'Start writing here. You can do it!',
    theme: 'snow',
    });

// Store accumulated changes
var change = new Delta();
                
editor.on('text-change', function(delta)
    { 
        change = change.compose(delta);
        console.clear();
        console.log(editor.getContents().ops);
    });

// Save periodically
setInterval(function() 
    {
        if (change.length() > 0) {
        console.log('Saving changes', change);

        /* Send partial changes
        $.post('/your-endpoint', { 
        partial: JSON.stringify(change) 
        });
    
        Send entire document
        $.post('/your-endpoint', { 
        doc: JSON.stringify(quill.getContents())
        });
        */
                    
        change = new Delta();
        }

    }, 5*1000);

// Check for unsaved data
window.onbeforeunload = function() 
    {
        if (change.length() > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
        }
    }

  
var storyline = [];
var storystring = JSON.stringify(storyline);

setTimeout(() => {
db.serialize(() => { 


db.each("SELECT DISTINCT chapname FROM Chapters ORDER BY chaporder", function(err,row) 
   { 
    if (err) 
    {console.log('ERROR!', err);}   
    
    else {
    storyline.push(row);
    console.log(row);
    console.log(storyline);   
    }
    
   });
}, 500);
});


setTimeout(() => { 

editor.setContents(storyline);
}, 1000);





