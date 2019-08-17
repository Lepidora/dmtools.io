var canvas;

function fileSelected(event) {
    
    var files = event.target.files;
    var selectedfile = files[0];
    
    if (!selectedfile.type.match('image.*')) {
        return;
    }

    var reader = new FileReader();
    
    reader.onload = (function(file) {
        return function(event) {
            
            var img = document.createElement('img');
            img.src = event.target.result;
            
            
            
            if (canvas) {
                
                console.log('Drawing');
                
                var context = canvas.getContext('2d');
                
                context.drawImage(img, 0, 0);
            }
        };
    })(selectedfile);
    
    reader.readAsDataURL(selectedfile);
    
}

function initialise() {
    
    var selector = document.getElementById('fileinput');
    canvas = document.getElementById('canvas');
    
    selector.addEventListener('change', fileSelected, false);
}

document.addEventListener('DOMContentLoaded', initialise, false);