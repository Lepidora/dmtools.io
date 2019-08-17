
function generateShop() {
    
    console.log('Generating shop');
	
	var typedropdown = document.getElementById('type');
	
	var type = typedropdown.options[typedropdown.selectedIndex];
	
	var exoticness = document.getElementById('exoticness').value;
	var size = document.getElementById('size').value;
	var seed = document.getElementById('seed').value;
	
	var parameters = {
			
			type: type,
			exoticness: exoticness,
			size: size,
			seed: seed			
	};
	
	doLocalPostRequest('/shop', parameters, function(error, event) {
	    
		if (error) {
			console.log(error);
			alert(error);
		} else {
		    
		    var request = event.target;
		    
			if (request.readyState === 4 && request.status === 200) {
				
				var results = JSON.parse(request.responseText);

	            console.log(results);
				
				populateResults(results);
			}
		}
	});
	
	return false;
}

function populateResults(results) {
	
	var resultdiv = document.getElementById('results');
	
	clearChildren(resultdiv);
	
	var items = results.items;
	var exoticness = results.exoticness;
	var size = results.size;
	
	document.getElementById('exoticness').value = exoticness;
	document.getElementById('size').value = size;
	
	for (var i = 0; i < items.length; i++) {
		
		var item = items[i];
		
		var div = document.createElement('div');
		
		var title = document.createElement('h3');
		var titletext = document.createTextNode(item.name);
		
		title.appendChild(titletext);
		
		title.style['font-size'] = '1.3em';
		
		var price = document.createElement('h4');
		var pricetext = document.createTextNode(item.price + 'g');
		
		price.appendChild(pricetext);
		
		
		
		//font-size: 25.5vw;
		
		div.appendChild(title);
		div.appendChild(price);
		
		div.classList.add('card-mini');
		
		var borderColor = colorFromTable(item.table);
		
		console.log(borderColor);
		
		div.style['border-style'] = 'solid';
		div.style['border-width'] = '2px';
		div.style['border-color'] = borderColor;
		
		//div.style['width'] = '';
		//div.style['height'] = '';
		
		resultdiv.appendChild(div);
	}
}

function colorFromTable(table) {
    
    switch (table) {
    
    case 0: {
        return '#fff';
    }
    
    case 1: {
        return '#61C936';
    }
    
    case 2: {
        return '#F6E900';
    }
    
    case 3: {
        return '#914FF5';
    }
    
    default: return '#fff';
    
    }
}