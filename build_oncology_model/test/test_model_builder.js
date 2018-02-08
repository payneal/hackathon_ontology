const chai = require('chai');
const expect = chai.expect;

const Builder = require('../index');
const builder = new Builder();

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
                    "links": [],
                    "connected_nodes": []
                }
            }
        );

        builder.add_link("ingredients_to_batter", "Type", 
            "MaterialTransformation");    

        expect(builder.model_rep).to.eql(
            {
                "ingredients_to_batter":{
                    "links": ["Type"],
                    "connected_nodes": ["MaterialTransformation"]
                },
                "MaterialTransformation": {
                    "links":[],
                    "connected_nodes": []
                }   
            }
        );

        builder.add_link("ingredients_to_batter", "hasOutput", 
            "cake_batter");    

        builder.add_link("ingredients_to_batter", "occursDurring",
            "time");

        builder.add_link(
            "ingredients_to_batter",
            "occursInNeighborhood", 
            "kitchen");
        
        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "sugar");

        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "flour");

        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "butter");
          
        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "backing_powder");

        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "milk");

        builder.add_link(
            "ingredients_to_batter",
            "hasInput", 
            "egg");

        console.log("" + JSON.stringify(builder.model_rep, null, 4));


    });
});
