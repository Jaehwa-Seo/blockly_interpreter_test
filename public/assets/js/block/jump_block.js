Blockly.Blocks['jump_block'] = {
    init: function() {
        this.appendDummyInput()
        .appendField(Blockly.Msg.JUMP_TITLE)
        this.setColour(18);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

// Blockly.BlockSvg.INLINE_PADDING_Y and Blockly.BlockSvg.MIN_BLOCK_Y

Blockly.JavaScript['jump_block'] = function(block) {
    var code ="Jump();"

    return code;
};

