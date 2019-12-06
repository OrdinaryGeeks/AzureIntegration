import Controls = require("VSS/Controls");
import Combos = require("VSS/Controls/Combos");
var container = $(".sample-container");
var makeOptions = <Combos.IComboOptions>{
width: "400px",
source:
["Aston Martin", "Audi (3)", "Bentley", "BMW (2)", "Bugatti",
"Ferrari", "Ford", "Honda", "Hyundai", "Kia", "Lamborghini",
"Land Rover", "Lotus", "Maserati", "Mazda", "Mercedes",
"Mitsubishi", "Nissan", "Porsche", "Toyota", "Volkswagen", "Volvo"],
change: function () {
var selected = this.getText();
if (selected.indexOf("Audi") === 0) {
modelCombo.setSource(["A3", "A4", "Q7"]);
modelCombo.setMode("drop");
}
else if (selected.indexOf("BMW") === 0) {
modelCombo.setSource(["325", "X5"]);
modelCombo.setMode("drop");
}
else {
modelCombo.setMode("text");
}
modelCombo.setText("");
}
};
var modelOptions = <Combos.IComboOptions>{
width: "400px",
mode: "text"
};
// Make combo
$("<label />").text("Make:").appendTo(container);
Controls.create(Combos.Combo, container, makeOptions);
// Model combo
$("<label />").text("Model:").appendTo(container);
var modelCombo = Controls.create(Combos.Combo, container, modelOptions);