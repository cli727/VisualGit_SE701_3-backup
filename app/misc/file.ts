let fileLocation;

function readFromFile(filePath) {
    fileLocation = require("path").join(repoFullPath, filePath);

    let lineReader = require("readline").createInterface({
      input: fs.createReadStream(fileLocation)
    });

    let doc = document.getElementById("diff-panel-body");
    lineReader.on("line", function (line) {
      let element = document.createElement("div");
      element.textContent = line;
      doc.appendChild(element);
    });
  }
  function saveFile() {
    let doc = document.getElementById("diff-panel-body");
    let children = doc.childNodes;
    
    let content = "";
    children.forEach(function (child) {
        content += child.textContent + "\n";
      });
    doc.textContent = content;
    fs.writeFile(fileLocation, content, 'utf8', function(err) {
        if (err) throw err;
        displayModal("File saved!");
    });
}

function saveSuccess(){
}

function cancelEdit(){
    hideDiffPanel();
}

function enableSaveCancelButton() {
  let saveButton = document.getElementById("save-button");
  let cancelButton = document.getElementById("cancel-button");
  saveButton.disabled = false;
  cancelButton.disabled = false;
}

function disableSaveCancelButton() {
    let saveButton = document.getElementById("save-button");
    let cancelButton = document.getElementById("cancel-button");
    saveButton.disabled = true;
    cancelButton.disabled = true;
  }