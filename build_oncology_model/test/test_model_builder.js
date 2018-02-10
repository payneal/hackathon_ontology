const chai = require('chai');
const expect = chai.expect;

const Builder = require('../index');
var builder = new Builder();

describe("Building a model for ontology", function() {

	it('should beable to create empty model', function() {
        var x = builder.create_model();
        expect(x).to.eql({});
    });

    it('set bad ontology settings', function() {
        var response = builder.set_ontology_mode("ALI");
        expect(response).to.equal('that is not a valid option');
    });

    it('set ontology settings to to BFO', function() {
        var response = builder.set_ontology_mode("BFO");
        expect(response).to.equal("mode has been set");
        expect(builder.mode).to.equal("BFO");
    });

    it('set ontology settings to to ODP', function() {
        var response = builder.set_ontology_mode("ODP");
        expect(response).to.equal("mode has been set");  
        expect(builder.mode).to.equal("ODP");
    });
    
    it('enter entry node when empty data', function() {
        var x = builder.create_model();
        builder.set_ontology_mode("ODP");
        builder.add_node("ingredients_to_batter");
        
        expect(builder.model_rep).to.eql(
            {
                "ingredients_to_batter":{
                    "id": 1,
                    "connection": []
                }
            }
        );

        builder.add_link("ingredients_to_batter", "Type", 
            "MaterialTransformation");    

        expect(builder.model_rep).to.eql(
            {
               "ingredients_to_batter":{
                    "id": 1,
                    "connection": [{
                        "label": "MaterialTransformation",
                        "connectionInfo": "Type"
                    }]
               },
                "MaterialTransformation":{
                    "id": 2,
                    "connection": []
                }
            }
        );

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"}
            ]
        );

        
        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"}
            ] 
        );
    
        
        builder.add_link("ingredients_to_batter", "hasOutput", "cake_batter");    

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
                {id: 3, label: "cake_batter"},
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"},
                {label:"hasOutput", from:1, to: 3}
            ] 
        );
   
        builder.add_link("ingredients_to_batter", "occursDurring","time");

        
        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
                {id: 3, label: "cake_batter"},
                {id:4, label: "time"}
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"},
                {from:1, to: 3, label: "hasOutput"},
                {from: 1, to: 4, label: "occursDurring"}
            ] 
        );
   
        builder.add_link(
            "ingredients_to_batter",
            "occursInNeighborhood", 
            "kitchen");

        builder.add_link(
            "ingredients_to_batter", "hasInput", 
            "sugar");

        builder.add_link(
            "ingredients_to_batter", "hasInput", 
            "flour");

        builder.add_link("ingredients_to_batter", "hasInput", 
            "butter");
    
        builder.add_link("ingredients_to_batter",
            "hasInput", "backing_powder");

              builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "milk");

        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
             "egg");

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
                {id: 3, label: "cake_batter"},
                {id: 4, label: "time"},
                {id: 5, label: "kitchen"},
                {id: 6, label: "sugar"},
                {id: 7, label: "flour"},
                {id: 8, label: "butter"},
                {id: 9, label: "backing_powder"},
                {id: 10, label: "milk"},
                {id: 11, label: "egg"}
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
           [
                {from: 1, to: 2, label: "Type"},
                {from: 1, to: 3, label: "hasOutput"},
                {from: 1, to: 4, label: "occursDurring"},
                {from: 1, to: 5, label: "occursInNeighborhood"},
                {from: 1, to: 6, label: "hasInput"},
                {from: 1, to: 7, label: "hasInput"},
                {from: 1, to: 8, label: "hasInput"},
                {from: 1, to: 9, label: "hasInput"},
                {from: 1, to: 10, label: "hasInput"},
                {from: 1, to: 11, label: "hasInput"}
           ] 
        );
    });

    it('go to 3rd level', function() {
        builder = new Builder();
        var x = builder.create_model();
        builder.set_ontology_mode("ODP");
        builder.add_node("ingredients_to_batter");

        expect(builder.model_rep).to.eql(
            {"ingredients_to_batter":{
                "id": 1,
                "connection": []}
            }
        );

        builder.add_link("ingredients_to_batter", "Type", 
            "MaterialTransformation");

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"},
            ] 
        );

        builder.add_link(
            "ingredients_to_batter", "hasOutput", "cake_batter");    

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
                {id: 3, label: "cake_batter"},
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"},
                {label:"hasOutput", from:1, to: 3}
            ] 
        );

        builder.add_link("cake_batter", "Type", "input");    

        expect(builder.get_graph_nodes()).to.eql(
            [
                {id: 1, label: "ingredients_to_batter"},
                {id: 2, label: "MaterialTransformation"},
                {id: 3, label: "cake_batter"},
                {id: 4, label: "input"}
            ]
        );

        expect(builder.get_graph_connections()).to.eql(
            [
                {from: 1, to: 2, label: "Type"},
                {from: 1, to: 3, label: "hasOutput"},
                {from: 3, to: 4, label: "Type"}
            ] 
        );

        //console.log(" here is nodes" + JSON.stringify(
        //    builder.get_graph_nodes()));

        //console.log(" here is connections " + JSON.stringify(
        //    builder.get_graph_connections()));
    });
    
});
