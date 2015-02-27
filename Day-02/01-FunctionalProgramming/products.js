var products = [
    {id : 7, name : "Pen", units : 80, cost : 30, category : 2},
    {id : 4, name : "Hen", units : 40, cost : 40, category : 1},
    {id : 9, name : "Zen", units : 70, cost : 60, category : 2},
    {id : 6, name : "Den", units : 60, cost : 20, category : 1},
    {id : 5, name : "Len", units : 90, cost : 80, category : 2},
    {id : 8, name : "Ken", units : 50, cost : 50, category : 1}
]

function print(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

print("Functional Programming techniques", function(){
    print("Default product list", function(){
        console.table(products);
    });
    print("Sorting", function(){
        print("Default sorting [id]", function(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++){
                    var left = products[i],
                        right = products[j];
                    if (left.id > right.id){
                        products[i] = products[j];
                        products[j] = left;
                    }
                }
            console.table(products);
        });
        print("Reusable sort [by any attribute - {cost}]", function(){
            function sort(list, attrName){
                for(var i=0; i<list.length-1; i++)
                    for(var j=i+1; j<list.length; j++){
                        var left = list[i],
                            right = list[j];
                        if (left[attrName] > right[attrName]){
                            list[i] = list[j];
                            list[j] = left;
                        }
                    }
            }
            sort(products,"cost");
            console.table(products);
        });
        print("Reusable sort [by any logic - {value -> units * cost}]", function(){
            function sort(list, comparerFn){
                for(var i=0; i<list.length-1; i++)
                    for(var j=i+1; j<list.length; j++){
                        var left = list[i],
                            right = list[j];
                        if (comparerFn(left,right) > 0 ){
                            list[i] = list[j];
                            list[j] = left;
                        }
                    }
            }
            function productComparerByValue (left, right){
                var p1Value= left.units * left.cost,
                    p2Value = right.units * right.cost;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });
    });
});


