import React from "react";

function ItemForm(props) {
    return (
        <form className="itemform" onSubmit={props.onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <div className="field">
                    <input
                        id="title"
                        onChange={props.onChange}
                        type="text"
                        name="title"
                        className="form-control"
                        value={props.item.title || ""}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <div className="field">
                    <input
                        id="comment"
                        onChange={props.onChange}
                        type="text"
                        name="comment"
                        className="form-control"
                        value={props.item.comment || ""}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="imageLink">Image</label>
                <div className="field">
                    <input
                        id="imageLink"
                        onChange={props.onChange}
                        type="text"
                        name="imageLink"
                        className="form-control"
                        value={props.item.imageLink || ""}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="diceValue">DiceValue</label>
                <div className="field">
                    <input
                        id="diceValue"
                        onChange={props.onChange}
                        type="text"
                        name="diceValue"
                        className="form-control"
                        value={props.item.diceValue || ""}
                    />
                </div>
            </div>


            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    );
}

export default ItemForm;