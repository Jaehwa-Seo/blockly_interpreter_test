Blockly.Blocks['run_block'] = {
    init: function() {
        this.appendDummyInput()
        .appendField(Blockly.Msg.RUN_TITLE)
        this.setColour(216);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.JavaScript['run_block'] = function(block) {
    var code ="Run();"
    return code;
};