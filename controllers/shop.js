const random = require('seedrandom');

let data = loadJSON();

function getShops() {

    data = loadJSON();

    return data.types;
}

function getShopData(type) {

    data = loadJSON();

    let types = data.types;

    let shopdata = types[type];

    if (shopdata) {

        return types[type];

    } else {
        return [];
    }
}

function loadJSON() {
    return require('../generators/shop.json');
}

function generateTables() {

    let tables = [];

    let items = data.items;

    //return items;

    for (let item of Object.values(items)) {

        let tablenum = item.table;

        if (tablenum > tables.length - 1) {

            for (let t = tables.length - 1; t <= tablenum; t++) {
                tables.push([]);
            }
        }

        let table = tables[tablenum];

        table.push(item);
    }

    return tables;	
}

function fitToSkew(value) {
    return value * value;
}

function getRandomSkewed(bound, rng) {

    let roll = rng();

    let fit = fitToSkew(roll);

    let scaled = fit * bound;

    //console.log(`Rolled ${roll} with fit ${fit} and scaled ${scaled}`);

    return scaled;
}

function getTableNumber(total, exoticness, exoticnesslimit, rng) {

    //console.log(`Rolling with ${total}, ${exoticness}, ${exoticnesslimit}`);

    let roll = getRandomSkewed(total - 1, rng);

    let exoticskew = roll * exoticness;

    //console.log(`Rolled ${roll} skewed to ${exoticskew}`);

    return Math.ceil(exoticskew);

    /*let uses = 0;

	let highest = 0;

	for (let i = 0; i < exoticness; i++) {

		let roll = getRandomSkewed(total - 1, rng);

		if (roll > highest) {
			highest = roll;
		}

		console.log(`Highest: ${highest}`);

		uses++;
	}

	console.log(`Uses: ${uses}`)

	for (let i = 0; i < exoticnesslimit - uses; i++) {
		rng();
	}

	return Math.ceil(highest);*/
}

function getItemNumber(total, rng) {
    
    let roll = rng() * (total - 1);
    
    return Math.ceil(roll);
}

function generateShop(req, res) {

    try {

        let body = req.body;

        let seed = body.seed;
        let type = body.type;
        let exoticness = body.exoticness;
        let variety = body.variety;
        let size = body.size;

        if (seed === '') {
            seed = new Date().getTime();
        }

        let rng = random(seed);

        let exoticlimit = 100;

        let exoticrng = rng();

        if (!exoticness || exoticness === '') {
            exoticness = exoticrng * exoticlimit;
        } else {

            if (exoticness > exoticlimit) {
                exoticness = exoticlimit;
            }

            if (exoticness < 1) {
                exoticness = 1;
            }
        }

        exoticness = exoticness / 100;

        let sizelimit = 200;

        let sizerng = rng();

        if (!size || size === '') {
            size = Math.ceil(sizerng * sizelimit);
        } else {

            if (size > sizelimit) {
                size = sizelimit;
            }

            if (size < 1) {
                size = 0;
            }
        }
        
        console.log(`Rolling with size ${size} and exoticness ${exoticness}`);

        let tables = generateTables();
        
        let items = [];

        for (let i = 0; i < size; i++) {
            
            let tablenumber = getTableNumber(tables.length + 1, exoticness, exoticlimit, rng) - 1;
            let table = tables[tablenumber];
            
            let itemnumber = getItemNumber(table.length, rng);
            let item = table[itemnumber];
            
            items.push(item);
        }

        //console.log(tablenumber);
        
        let send = {
                items: items,
                exoticness: Math.round(exoticness * 100),
                size: size
                };

        res.send(send);

    } catch (error) {

        console.log(error);

        res.send({error: 1});
    }
}

exports.getShops = getShops;
exports.getShopData = getShopData;

exports.generateShop = generateShop;