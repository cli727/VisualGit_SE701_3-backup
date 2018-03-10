var fileLocation;
function readFromFile(filePath) {
    fileLocation = require("path").join(repoFullPath, filePath);
    var lineReader = require("readline").createInterface({
        input: fs.createReadStream(fileLocation)
    });
    var doc = document.getElementById("diff-panel-body");
    lineReader.on("line", function (line) {
        var element = document.createElement("div");
        element.textContent = line;
        doc.appendChild(element);
    });
}
function saveFile() {
    var doc = document.getElementById("diff-panel-body");
    var children = doc.childNodes;
    var content = "";
    children.forEach(function (child) {
        content += child.textContent + "\n";
    });
    doc.textContent = content;
    fs.writeFile(fileLocation, content, 'utf8', function (err) {
        if (err)
            throw err;
        displayModal("File saved!");
    });
}
function saveSuccess() {
}
function cancelEdit() {
    hideDiffPanel();
}
function enableSaveCancelButton() {
    var saveButton = document.getElementById("save-button");
    var cancelButton = document.getElementById("cancel-button");
    saveButton.disabled = false;
    cancelButton.disabled = false;
}
function disableSaveCancelButton() {
    var saveButton = document.getElementById("save-button");
    var cancelButton = document.getElementById("cancel-button");
    saveButton.disabled = true;
    cancelButton.disabled = true;
}
