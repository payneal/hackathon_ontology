
function Model_builder() {
    
    var self = this;
    this.model_rep = {};
    this.mode = "ODP";
    this.mode_options = ["BFO", "ODP"]
    this.count = 0;
    this.graph_connections = []

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
        self.model_rep[node].connection = []
        self.model_rep[node].connection.push(
            {"label": connection,
            "connectionInfo": link});
        add_node(connection);
        // hacky lol but needed
        self.get_graph_connections();
    }
    
    this.get_graph_nodes = function() {
        var info = []
        for (x in self.model_rep) {
            var hold = {"id": self.model_rep[x].id, "label": x}
            info.push(hold);
        }
        return info;
    }

    this.get_graph_connections = function() {
        var info = [];
        for (x in self.model_rep) {
            info = check_if_any_connections(x, info)
        }
        add_connections_to_graph_holder(info);
        return self.graph_connections;
    }

    function add_connections_to_graph_holder(info) {
        for (var i= 0; i < info.length; i++) {
            check_if_should_be_added_to_connections(
                info[i])
        }
    }

    function  check_if_should_be_added_to_connections( text) {
        var string_of_connections = JSON.stringify(
            self.graph_connections);
        var adding_connection = JSON.stringify(text)
        if (!string_of_connections.includes(adding_connection)) {
            self.graph_connections.push(text);
        }
    }

    function check_if_any_connections(x, info) {
        var connection = self.model_rep[x].connection;
        if (Object.keys(connection).length) {
            return create_graph_connections_info(x, info);
        }
        return info;
    }

    function create_graph_connections_info(label, info) {        
        var id =  self.model_rep[label].id;
        var connects = self.model_rep[label].connection;
        var answer = add_all_connections_to_info(id, connects);
        return add_to_info_structure(answer, info);
    }

    function add_to_info_structure(answer, info) {
        for (var x = 0; x < answer.length; x++ ) {
            info.push(answer[x]);
        }
        return info;
    }

    function add_all_connections_to_info(id, connects) {
        var info = [];
        for (y in connects ) {
            var stuff = {}
            stuff['label'] = connects[y].connectionInfo;
            stuff['from'] = id;
            info.push(get_to_point_for_connection(y, stuff, connects));
        }
        return info;
    }

    function  get_to_point_for_connection(y, stuff, connects) {
        for (x in self.model_rep) {
            if (x == connects[y].label) {
                var connect_id =  self.model_rep[x].id;
                stuff['to'] = connect_id;
            }
        }
        return stuff;
    }

    function add_node(index) {
        self.count++;    
        self.model_rep[index] = {};
        self.model_rep[index].id = self.count;
        self.model_rep[index].connection = []
    }
 
};

module.exports = Model_builder;
