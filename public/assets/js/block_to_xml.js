function saveBlocks() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    // do whatever you want to this xml
    console.log(xmlText);
}