define([], function(){
    function SalaryCalculator(){
        var _data = {
            basic : 0,
            hra : 0,
            da : 0,
            tax : 0,
            salary : 0
        };
        this.get = function(attrName){
            return _data[attrName];
        };
        this.set = function(attrName, value){
            _data[attrName] = value;
           triggerEvents.call(this, attrName);
        };
        function triggerEvents(attrName){
             if (typeof _events[attrName] !== "undefined"){
                var allCallbacks = _events[attrName];
                for(var i=0; i < allCallbacks.length; i++)
                    allCallbacks[i].call(this);
            }
        }

        var _events = {   };

        this.addEvent = function(attrName, callbackFn){
            if (typeof _events[attrName] === "undefined")
                _events[attrName]  = [];
            _events[attrName].push( callbackFn);
        }
        this.onSalaryChange = null;
    }
    SalaryCalculator.prototype.calculate = function(){
        var gross = this.get('basic') + this.get('hra') + this.get('da');
        var net = gross * ((100-this.get('tax'))/100);
        this.set('salary',net);
    }

    return SalaryCalculator;
});
