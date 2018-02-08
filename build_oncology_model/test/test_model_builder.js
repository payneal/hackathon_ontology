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
        builder.add_first_node("Physiotherapy Center");
        
    });





    


});
