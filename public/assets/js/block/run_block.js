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
    // return "if (! await Run()) { return;}";
    return ""
    + "/*_*/if (! await /*_*/"
    + "Run()"
    + "/*_*/) { return;}/*_*/"
    + "/*_;_*/\n"; // fix: indentation
};