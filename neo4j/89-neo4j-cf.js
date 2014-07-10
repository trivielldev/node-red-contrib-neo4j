var neo4j = require("node-neo4j")

module.exports = function(RED) {
    function Neo4jNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        
        console.log(config.url);
        var db = new neo4j(config.url);
        this.on('input', function(msg) {
        	
            var query = msg.payload.query;
        
            db.cypherQuery(query, function (err, results){ 
        		if (err) throw err;
        		node.send(results);
        	});           
        });
    }

    RED.nodes.registerType("neo4j",Neo4jNode);
}