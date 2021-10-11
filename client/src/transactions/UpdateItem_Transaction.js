import jsTPS_Transaction from "../common/jsTPS.js"

export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, index, initOldText, initNewText) {
        super();
        this.store = initStore;
        this.index = index;
        this.oldItemText = initOldText;
        this.newItemText = initNewText;
    }

    doTransaction() {
        this.store.updateItem(this.index, this.newItemText);
    }
    
    undoTransaction() {
        this.store.updateItem(this.index, this.oldItemText);
    }
}