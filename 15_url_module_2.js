var url = require('url');
var http = require('http');
//http://localhost:5000/bus?from=bhavnagar&to=Ahmedabad
var data = [
    { "source": "Bhavnagar", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "06:15", "price": 345 },
    { "source": "Ahmedabad", "destination": "Surat", "journeyType": "AC", "departureTime": "08:30", "price": 412 },
    { "source": "Rajkot", "destination": "Jamnagar", "journeyType": "gujarat nagari", "departureTime": "07:45", "price": 255 },
    { "source": "Surat", "destination": "Baroda", "journeyType": "sleeper", "departureTime": "22:00", "price": 198 },
    { "source": "Baroda", "destination": "Bhuj", "journeyType": "express", "departureTime": "09:15", "price": 476 },
    { "source": "Jamnagar", "destination": "Rajkot", "journeyType": "AC", "departureTime": "14:20", "price": 330 },
    { "source": "Bhuj", "destination": "Ahmedabad", "journeyType": "sleeper", "departureTime": "20:30", "price": 289 },
    { "source": "Ahmedabad", "destination": "Bhavnagar", "journeyType": "gujarat nagari", "departureTime": "11:00", "price": 420 },
    { "source": "Surat", "destination": "Rajkot", "journeyType": "express", "departureTime": "05:40", "price": 156 },
    { "source": "Baroda", "destination": "Surat", "journeyType": "AC", "departureTime": "17:50", "price": 265 },

    { "source": "Rajkot", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "21:15", "price": 310 },
    { "source": "Bhavnagar", "destination": "Surat", "journeyType": "gujarat nagari", "departureTime": "10:30", "price": 480 },
    { "source": "Ahmedabad", "destination": "Jamnagar", "journeyType": "express", "departureTime": "13:45", "price": 190 },
    { "source": "Bhuj", "destination": "Baroda", "journeyType": "AC", "departureTime": "19:00", "price": 399 },
    { "source": "Jamnagar", "destination": "Bhavnagar", "journeyType": "sleeper", "departureTime": "23:10", "price": 210 },
    { "source": "Surat", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "07:20", "price": 350 },
    { "source": "Rajkot", "destination": "Surat", "journeyType": "gujarat nagari", "departureTime": "16:05", "price": 475 },
    { "source": "Baroda", "destination": "Rajkot", "journeyType": "AC", "departureTime": "12:40", "price": 232 },
    { "source": "Bhavnagar", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "18:30", "price": 288 },
    { "source": "Ahmedabad", "destination": "Baroda", "journeyType": "express", "departureTime": "15:55", "price": 305 },

    { "source": "Surat", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "09:10", "price": 440 },
    { "source": "Jamnagar", "destination": "Ahmedabad", "journeyType": "gujarat nagari", "departureTime": "06:50", "price": 157 },
    { "source": "Bhuj", "destination": "Rajkot", "journeyType": "express", "departureTime": "08:00", "price": 280 },
    { "source": "Baroda", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "22:45", "price": 325 },
    { "source": "Rajkot", "destination": "Baroda", "journeyType": "AC", "departureTime": "11:20", "price": 498 },
    { "source": "Ahmedabad", "destination": "Bhuj", "journeyType": "express", "departureTime": "20:15", "price": 170 },
    { "source": "Bhavnagar", "destination": "Rajkot", "journeyType": "gujarat nagari", "departureTime": "14:00", "price": 465 },
    { "source": "Surat", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "19:40", "price": 310 },
    { "source": "Jamnagar", "destination": "Surat", "journeyType": "express", "departureTime": "07:30", "price": 380 },
    { "source": "Baroda", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "10:45", "price": 299 },

    { "source": "Rajkot", "destination": "Ahmedabad", "journeyType": "gujarat nagari", "departureTime": "13:20", "price": 460 },
    { "source": "Bhuj", "destination": "Surat", "journeyType": "sleeper", "departureTime": "21:50", "price": 249 },
    { "source": "Bhavnagar", "destination": "Baroda", "journeyType": "express", "departureTime": "08:20", "price": 355 },
    { "source": "Ahmedabad", "destination": "Rajkot", "journeyType": "AC", "departureTime": "18:45", "price": 415 },
    { "source": "Surat", "destination": "Jamnagar", "journeyType": "gujarat nagari", "departureTime": "12:10", "price": 180 },
    { "source": "Baroda", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "16:35", "price": 275 },
    { "source": "Jamnagar", "destination": "Surat", "journeyType": "express", "departureTime": "09:55", "price": 490 },
    { "source": "Rajkot", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "15:10", "price": 340 },
    { "source": "Bhuj", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "07:05", "price": 130 },
    { "source": "Ahmedabad", "destination": "Surat", "journeyType": "sleeper", "departureTime": "23:25", "price": 265 },

    { "source": "Bhavnagar", "destination": "Jamnagar", "journeyType": "express", "departureTime": "11:40", "price": 205 },
    { "source": "Surat", "destination": "Rajkot", "journeyType": "AC", "departureTime": "19:15", "price": 499 },
    { "source": "Baroda", "destination": "Ahmedabad", "journeyType": "gujarat nagari", "departureTime": "14:30", "price": 270 },
    { "source": "Jamnagar", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "22:05", "price": 350 },
    { "source": "Rajkot", "destination": "Surat", "journeyType": "express", "departureTime": "06:25", "price": 190 },
    { "source": "Bhuj", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "17:40", "price": 405 },
    { "source": "Ahmedabad", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "10:05", "price": 225 },
    { "source": "Surat", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "21:00", "price": 380 },
    { "source": "Baroda", "destination": "Rajkot", "journeyType": "express", "departureTime": "08:50", "price": 315 },
    { "source": "Bhavnagar", "destination": "Surat", "journeyType": "AC", "departureTime": "16:20", "price": 455 },

    { "source": "Jamnagar", "destination": "Ahmedabad", "journeyType": "gujarat nagari", "departureTime": "12:55", "price": 140 },
    { "source": "Rajkot", "destination": "Bhuj", "journeyType": "sleeper", "departureTime": "20:10", "price": 260 },
    { "source": "Bhuj", "destination": "Surat", "journeyType": "express", "departureTime": "07:35", "price": 355 },
    { "source": "Ahmedabad", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "15:50", "price": 490 },
    { "source": "Surat", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "09:25", "price": 112 },
    { "source": "Baroda", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "23:40", "price": 300 },
    { "source": "Bhavnagar", "destination": "Rajkot", "journeyType": "express", "departureTime": "11:15", "price": 199 },
    { "source": "Jamnagar", "destination": "Surat", "journeyType": "AC", "departureTime": "18:30", "price": 480 },
    { "source": "Rajkot", "destination": "Ahmedabad", "journeyType": "gujarat nagari", "departureTime": "13:45", "price": 258 },
    { "source": "Bhuj", "destination": "Baroda", "journeyType": "sleeper", "departureTime": "21:20", "price": 318 },

    { "source": "Ahmedabad", "destination": "Surat", "journeyType": "express", "departureTime": "06:10", "price": 270 },
    { "source": "Surat", "destination": "Bhuj", "journeyType": "AC", "departureTime": "17:25", "price": 490 },
    { "source": "Baroda", "destination": "Bhavnagar", "journeyType": "gujarat nagari", "departureTime": "10:40", "price": 206 },
    { "source": "Jamnagar", "destination": "Rajkot", "journeyType": "sleeper", "departureTime": "22:55", "price": 310 },
    { "source": "Rajkot", "destination": "Surat", "journeyType": "express", "departureTime": "08:15", "price": 165 },
    { "source": "Bhuj", "destination": "Ahmedabad", "journeyType": "AC", "departureTime": "16:00", "price": 460 },
    { "source": "Bhavnagar", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "12:30", "price": 435 },
    { "source": "Ahmedabad", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "20:45", "price": 210 },
    { "source": "Surat", "destination": "Rajkot", "journeyType": "express", "departureTime": "07:55", "price": 280 },
    { "source": "Baroda", "destination": "Bhuj", "journeyType": "AC", "departureTime": "15:20", "price": 390 },

    { "source": "Jamnagar", "destination": "Surat", "journeyType": "gujarat nagari", "departureTime": "09:05", "price": 152 },
    { "source": "Rajkot", "destination": "Bhavnagar", "journeyType": "sleeper", "departureTime": "23:15", "price": 270 },
    { "source": "Bhuj", "destination": "Surat", "journeyType": "express", "departureTime": "11:50", "price": 325 },
    { "source": "Ahmedabad", "destination": "Baroda", "journeyType": "AC", "departureTime": "19:35", "price": 410 },
    { "source": "Surat", "destination": "Jamnagar", "journeyType": "gujarat nagari", "departureTime": "14:10", "price": 240 },
    { "source": "Baroda", "destination": "Rajkot", "journeyType": "sleeper", "departureTime": "21:30", "price": 310 },
    { "source": "Bhavnagar", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "06:35", "price": 285 },
    { "source": "Jamnagar", "destination": "Bhuj", "journeyType": "AC", "departureTime": "17:10", "price": 390 },
    { "source": "Rajkot", "destination": "Surat", "journeyType": "gujarat nagari", "departureTime": "10:25", "price": 165 },
    { "source": "Bhuj", "destination": "Bhavnagar", "journeyType": "sleeper", "departureTime": "22:20", "price": 300 },

    { "source": "Ahmedabad", "destination": "Rajkot", "journeyType": "express", "departureTime": "08:40", "price": 260 },
    { "source": "Surat", "destination": "Baroda", "journeyType": "AC", "departureTime": "16:45", "price": 488 },
    { "source": "Baroda", "destination": "Surat", "journeyType": "gujarat nagari", "departureTime": "12:00", "price": 192 },
    { "source": "Bhavnagar", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "20:05", "price": 305 },
    { "source": "Jamnagar", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "07:10", "price": 350 },
    { "source": "Rajkot", "destination": "Bhuj", "journeyType": "AC", "departureTime": "15:40", "price": 450 },
    { "source": "Bhuj", "destination": "Rajkot", "journeyType": "gujarat nagari", "departureTime": "09:30", "price": 220 },
    { "source": "Ahmedabad", "destination": "Surat", "journeyType": "sleeper", "departureTime": "23:50", "price": 290 },
    { "source": "Surat", "destination": "Bhavnagar", "journeyType": "express", "departureTime": "11:20", "price": 355 },
    { "source": "Baroda", "destination": "Jamnagar", "journeyType": "AC", "departureTime": "18:55", "price": 470 },
    { "source": "Bhavnagar", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "13:15", "price": 260 },
    { "source": "Jamnagar", "destination": "Surat", "journeyType": "sleeper", "departureTime": "21:40", "price": 315 },
    { "source": "Rajkot", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "06:00", "price": 185 },
    { "source": "Bhuj", "destination": "Surat", "journeyType": "AC", "departureTime": "17:15", "price": 399 },
    { "source": "Ahmedabad", "destination": "Bhuj", "journeyType": "gujarat nagari", "departureTime": "10:50", "price": 260 },
    { "source": "Surat", "destination": "Rajkot", "journeyType": "sleeper", "departureTime": "22:35", "price": 295 },
    { "source": "Baroda", "destination": "Bhavnagar", "journeyType": "express", "departureTime": "08:30", "price": 200 },
    { "source": "Bhavnagar", "destination": "Surat", "journeyType": "AC", "departureTime": "16:10", "price": 455 },
    { "source": "Jamnagar", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "12:35", "price": 215 },
    { "source": "Rajkot", "destination": "Jamnagar", "journeyType": "sleeper", "departureTime": "20:25", "price": 310 },

    { "source": "Bhuj", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "07:25", "price": 290 },
    { "source": "Ahmedabad", "destination": "Rajkot", "journeyType": "AC", "departureTime": "15:05", "price": 405 },
    { "source": "Surat", "destination": "Bhuj", "journeyType": "gujarat nagari", "departureTime": "09:45", "price": 250 },
    { "source": "Baroda", "destination": "Surat", "journeyType": "sleeper", "departureTime": "23:20", "price": 330 },
    { "source": "Bhavnagar", "destination": "Ahmedabad", "journeyType": "express", "departureTime": "11:00", "price": 265 },
    { "source": "Jamnagar", "destination": "Bhavnagar", "journeyType": "AC", "departureTime": "18:20", "price": 478 },
    { "source": "Rajkot", "destination": "Baroda", "journeyType": "gujarat nagari", "departureTime": "13:50", "price": 230 },
    { "source": "Bhuj", "destination": "Surat", "journeyType": "sleeper", "departureTime": "21:10", "price": 285 }
];
// create function that accept request
function handleRequest(request, response) {
    var url_data = url.parse(request.url, true);
    console.log(url_data);
    var input = url_data.query;
    var message = '';
    if (input.from === undefined || input.to === undefined) {
        message = [{error:"input is missing"}];
    }
    else {
        var available_routes = data.filter((item) => {
            if (item.source.toLowerCase() == input.from && item.destination.toLowerCase() === input.to) {
                return item;
            }
        });
        message = available_routes;
    }
    response.writeHead(200,{'content-type':'application/json'});
    response.write(JSON.stringify(message));
    return response.end()
}
var server = http.createServer((request, response) => handleRequest(request, response));
var portno = 5000;
server.listen(portno);
console.log("server started....");