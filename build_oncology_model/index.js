
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
    
    this.add_first_node = function(name) {
       
    }

};

module.exports = Model_builder;
