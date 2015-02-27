require(['SalaryCalculator','SalaryCalculatorView','jquery'], function(SalaryCalculator, SalaryCalculatorView, $){
    $(function(){
        window.calculator = new SalaryCalculator();

        //view1
        window.view1 = new SalaryCalculatorView(calculator);
        view1.init();
        view1.render();
        view1.$root.appendTo(document.body);

        //view2
        window.view2 = new SalaryCalculatorView(calculator);
        view2.init();
        view2.render();
        view2.$root.appendTo(document.body);

    });
});
