define(['jquery','text!calculatorTemplate.html'], function($, template){
    function SalaryCalculatorView(calculator){

        var $root = this.$root = $("<div></div>");

        this.init = function(){
            $root.on("change", "#txtBasic", function(){
                calculator.set('basic',parseInt(this.value,10));
            });

            $root.on("change", "#txtHra" , function(){
                calculator.set('hra',parseInt(this.value,10));
            });

            $root.on("change", "#txtDa", function(){
                calculator.set('da',parseInt(this.value,10));
            });

            $root.on("change", "#rangeTax", function(){
                calculator.set('tax',parseInt(this.value,10));
            });

            $root.on("click", "#btnCalculate", function(){
                calculator.calculate();
            });


            calculator.addEvent('salary', function(){
                 $("#divResult", $root).html(calculator.get('salary'));
            });
            calculator.addEvent('basic', function(){
                $("#txtBasic", $root).val(calculator.get('basic'));
            });
            calculator.addEvent('hra', function(){
                $("#txtHra", $root).val(calculator.get('hra'));
            });
            calculator.addEvent('da', function(){
                $("#txtDa", $root).val(calculator.get('da'));
            });
            calculator.addEvent('tax', function(){
                $("#rangeTax", $root).val(calculator.get('tax'));
                $("#spanTax", $root).html(calculator.get('tax') + '%');
            });
        };

        this.render = function(){
            this.$root.html(template);
        }
    }

    return SalaryCalculatorView;
});
