
function Model_builder() {
    
    var self = this;
    this.model_rep = {};
    this.mode = "ODP";
    this.mode_options = ["BFO", "ODP"]

    this.create_model = function() {
         return self.model_rep;
    }
    
    this.set_ontology_mode = function(mode) {
        if (self.mode_options.includes(mode.toUpperCase())) {
            self.mode = mode.toUpperCase();
            return "mode has been set";
        } else return "that is not a valid option";   
    }
    
    this.add_node = function(name) {
        add_node(name);
    }

    this.add_link = function( node, link, connection) {
        self.model_rep[node].links.push(link);
        self.model_rep[node].connected_nodes.push(connection);
        add_node(connection);      
    }

    function add_node(index) { 
        self.model_rep[index] = {};
        self.model_rep[index].links= [];
        self.model_rep[index].connected_nodes = []
    }
 
};

module.exports = Model_builder;
