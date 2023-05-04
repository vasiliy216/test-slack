const http = require("http")

const server = http.createServer(function (req, res) {
	console.log("TEST")
})

server.listen(5001, () => {
	console.log("TEST")
})