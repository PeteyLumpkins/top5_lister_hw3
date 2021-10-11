import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    function toggleEdit(event) {
        store.setIsItemEditActive(true);
        setIsEditing(true);
    }

    function handleKeyPress(event) {

        if (event.code ==="Enter") {
            let index = event.target.id.substring("edit-item-".length);
            setIsEditing(false)
            store.addUpdateItemTransaction(parseInt(index) - 1, props.text, event.target.value);
            store.setIsItemEditActive(false);

        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    if (!isEditing && !store.isItemEditActive) {
        return (
            <div
                id={'item-' + (index + 1)}
                className={itemClass}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable="true"
            >
                <input
                    type="button"
                    id={"edit-item-" + (index + 1)}
                    className="list-card-button"
                    onClick={toggleEdit}
                    value={"\u270E"}
                />
                {props.text}
            </div>);
    } else if (!isEditing) {
        return (
            <div
                id={'item-' + (index + 1)}
                className={itemClass}
            >
            <input
                type="button"
                id={"edit-item-" + (index + 1)}
                className="list-card-button"
                value={"\u270E"}
                />
            {props.text}
            </div>
        );
    } else {
        return (
            <input
                id={"edit-item-" + (index + 1)}
                className='top5-item'
                type='text'
                onKeyPress={handleKeyPress}
                defaultValue={props.text}
            />
        );
    }
}

export default Top5Item;