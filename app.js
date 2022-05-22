const fs = require('fs');
const http = require('http');
const path = require('path');
const port = 3000;

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
    }
}

/* *********************************************************************
   Setup HTTP route handling: Called when a HTTP request is received 
   ******************************************************************** */
function processReq(req, res) {
    console.log("GOT: " + req.method + " " + req.url);
    const url = req.url;

    switch (req.method) {
        case "POST": {
            switch (url) {
                case "/add-movie": {
                    
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
                case "/":
                    const path = "/PublicResources/html/index.html"
                    fs.readFileSync(path, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.writeHead(404, { "Content-Type": "text/html" });
                            res.write("404 - File not found");
                        } else {
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.write(data);
                            res.end('\n');
                        }
                    });
                    break;
            
                default:
                    break;
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
