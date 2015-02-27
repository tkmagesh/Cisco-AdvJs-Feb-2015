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
    print("Filtering", function(){
        function filter(list, criteriaFn){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (criteriaFn(list[i]))
                    result.push(list[i]);
            return result;
        }
        var costlyProductCriteria = function(product){
            return product.cost > 50;
        }
        print("Costly Products", function(){
            var costlyProducts = filter(products,costlyProductCriteria);
            console.table(costlyProducts);
        });
        print("Affordable Products", function(){
            /*var affordableProductCriteria = function(product){
                return !cosltyProductCriteria(product);
            }*/
            /*function negate(criteriaFn){
                return function(item){
                    return !criteriaFn(item);
                }
            }*/
            function negate(criteriaFn){
                return function(){
                    return !criteriaFn.apply(this, arguments);
                }
            }
            var affordableProductCriteria = negate(costlyProductCriteria);
            var affordableProducts = filter(products,affordableProductCriteria);
            console.table(affordableProducts);
        });
    });

    print("Any", function(){
        function any(list, predicate){
            for(var i=0; i<list.length; i++)
                if (predicate(list[i])) return true;
            return false;
        }
        var costlyProductPredicate = function(product){
           return product.cost >= 50;
        }
        console.log("Are there any costly products?", any(products, costlyProductPredicate));
    });
    print("All", function(){
        function all(list, predicate){
            for(var i=0; i<list.length; i++)
                if (!predicate(list[i])) return false;
            return true;
        }
        var costlyProductPredicate = function(product){
           return product.cost >= 50;
        }
        console.log("Are all the products costly?", all(products, costlyProductPredicate));
    });
    print ("Sum", function(){
        function sum(list, valueSelectorFn){
            var result = 0;
            for(var i=0; i<list.length;i++)
                result += valueSelectorFn(list[i]);
            return result;
        }
        function productValueSelector (product){
            return product.cost * product.units;
        }
        console.log("Sum of product value [cost * units]", sum(products, productValueSelector));
    });
    //min
    //max
    print("GroupBy", function(){
        function groupBy(list, keySelectorFn){
            var result = {};
            for(var i=0; i< list.length;i++){
                var key = keySelectorFn(list[i]);
                if (typeof result[key] === "undefined")
                    result[key] = [];
                result[key].push(list[i]);
            }
            return result;
        }
        print("Products By Category", function(){
            var categoryKeySelector = function(product){ return product.category; };
            var productsByCategory = groupBy(products, categoryKeySelector);
            for(var key in productsByCategory){
                print("Product with Category - " + key, function(){
                    console.table(productsByCategory[key]);
                });
            }
        });

        print("Products By Cost", function(){
            var costKeySelector = function(product){
                return product.cost > 50 ? "costly" : "affordable"
            };
            var productsByCost = groupBy(products, costKeySelector);
            for(var key in productsByCost){
                print("Product with Cost - " + key, function(){
                    console.table(productsByCost[key]);
                });
            }
        });






    });
});

function memoize(fn){
   var cache = {};
   return function(){
       var key = JSON.stringify(arguments);
       if (typeof cache[key] === "undefined")
          cache[key] = fn.apply(this,arguments);
       return cache[key];
   }
}

function add(x,y){
    console.log("processing");
    return x + y;
}

var cachedAdd = memoize(add);

cachedAdd(100,200);
cachedAdd(100,200);



