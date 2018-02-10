# how to use

##  Model_to_ graph.js

* to create buyilder
```javascript
    
    const Builder = require(../(file_location)); 
    const builder = new Builder();
```

* switch to BFO or ODP Ontology
```javascript
    //not fully implemented so ignore for now
    
    //FOR BFO
    var change = builder.set_ontology_mode("ODP");
    console.log(change);
    // shoul print mode has been set
    
    // FOR ODP
    var change = builder.set_ontology_mode("ODP");
    console.log(change);
    // shoul print mode has been set
```


* adding first node
``` javascript

    builder.add_node("ingredients_to_batter");

    console.log(builder.model_rep);
    // should print
    {
        ingredients_to_batter : {
            id: 1,
            connection: []
        }
    }
```


* adding first link
``` javascript 

    builder.add_link(
        "ingredients_to_batter", "Type",
        "MaterialTransformation");

      console.log(builder.model_rep);
    // should print
    {
        ingredients_to_batter : {
            id: 1,
            connection: [{
                "label": "MaterialTransformation"
                "connectionInfo": "Type"
            }]
        },
        MaterialTransformation: {
            id: 2,
            connection: []
        }
    }
```


* integrating with vis.js 
``` javascript
    
    console.log(builder.get_graph_nodes());
    // should shopw
    [
        {id: 1, label: "ingredients_to_batter"},
        {id: 2, label: "MaterialTransformation"}
    ]

    
    console.log(builder.get_graph_connections())
    //should show
    [
        {from: 1, to:2, label:"Type"}
    ]

```

* ex. of continued use
``` javascript 

    builder.add_link(
        "ingredients_to_batter",
        "hasOutput",
        "cake_batter"
    );


    builder.get_graph_nodes();
    // shows
    [
        {id: 1, label: "ingredients_to_batter"},
        {id: 2, label: "MaterialTransformation"},
        {id: 3, label: "cake_batter"}
    ]

    builder.get_graph_connections();
    // shows
    [
        {from: 1, to:2, label:"Type"},
        {from: 1, to:3, label:"hasOutput"}
    ]


    Builder.add_link("cake_batter", "Type", "input");
I
   builder.get_graph_nodes()
   // shows
   [
        {id: 1, label: "ingredients_to_batter"},
        {id: 2, label: "MaterialTransformation"},
        {id: 3, label: "cake_batter"}
        {id: 4, label: "input"}
   ]

   
   builder.get_graph_connections()
   // shows
   [
        {from: 1, to:2, label:"Type"},
        {from: 1, to:3, label:"hasOutput"},
        {from: 3, to:4, label:"Type"},
    ]


    // to test see test folder

```
