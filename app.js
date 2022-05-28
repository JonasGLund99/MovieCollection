const fs = require('fs');
const http = require('http');
const { URLSearchParams } = require('url');
const port = 8080;

const { addMovie } = require('./utils');

const server = http.createServer(requestHandler);


// function jsonResponse(res, obj){
//     res.writeHead(200, { "Content-Type": "application/json" }),
//     res.write(JSON.stringify(obj));
//     res.end();
// }

function requestHandler(req, res) {
    try {
        processReq(req, res);
    } catch(e) {
        console.log("InternalError" + "!!: " + e);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("500 - Internal server error");
    }
}

/* *********************************************************************
   Setup HTTP route handling: Called when a HTTP request is received 
   ******************************************************************** */
function processReq(req, res) {
    console.log("GOT: " + req.method + " " + req.url);
    const url = req.url;
    console.log("URL: " + url);

    switch (req.method) {
        case "POST": {
            switch (url) {
                case "/add-movie": {
                    // addMovie();
                    req.on("data", (data) => {
                        console.log(data);
                        console.log(data.toString());
                        const searchParams = new URLSearchParams(data.toString());
                        const newMovie = {
                            title: searchParams.get('movie-title'),
                            personalRating: searchParams.get('personal-rating'),
                            dateFirstWatched: searchParams.get('first-watched'),
                            watchCounter: searchParams.get('watch-counter')
                        }

                        console.log(newMovie);
                        // const movieDB = JSON.parse(fs.readFileSync('./movies.json'));
                        const movieDB = require('./movies.json');
                        movieDB.movies.push(newMovie);
                        console.log(movieDB);
                        const newMovieDB = JSON.stringify(movieDB, null, 4);
                        fs.writeFileSync('./movies.json', newMovieDB);
                        
                        res.writeHead(302, { "location": "/"});
                        res.end('\n')
                    })
                    break;
                }
                case "/delete-movie": {
                    
                    break;
                }
                case "/update-movie": {
                    
                    break;
                }
                
                default:
                    break;
            }
            break;
        }
        case "GET": {
            switch (url) {
                case "/": {
                    const path = "PublicResources/html/index.html"
                    console.log("Path: " + path);
                    try {
                        const data = fs.readFileSync(path, "utf8");
                        // console.log("File content: " + data);
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        res.end('\n');
                    } catch (err) {
                        console.log(err);
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.write("404 - File not found");
                        res.end('\n');  
                    }
                    break;
                }

                default: { //for anything else we assume it is a css or JavaScript file to be served
                    const path = "PublicResources" + url;
                    console.log(path);
                    if (fs.existsSync(path)) {
                        const data = fs.readFileSync(path);
                        if (path.split(".").pop().toLowerCase() === "css") {
                            res.writeHead(200, { "Content-Type": "text/css" });
                        } else {
                            res.writeHead(200, { "Content-Type": "text/javascript" });
                        }
                        res.write(data);
                        res.end('\n');
                    } else {
                        console.log("404 - File not found");
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.write("404 - File not found");
                        res.end('\n');
                    }
                    break;
                }
            }
            break;
        }
        default:
            break;
    }
}

function startServer() {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}

startServer();
