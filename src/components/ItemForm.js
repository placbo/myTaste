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
                <label htmlFor="tags">Tags (comma separated)</label>
                <div className="field">
                    <input
                        id="tags"
                        onChange={props.onChange}
                        type="text"
                        name="tags"
                        className="form-control"
                        value={props.item.tags || ""}
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

            <div className="form-group">
                <label htmlFor='fileUpload'>
                    Last opp
                </label>
                <div className="field">
                    <input
                        type='file'
                        id='fileUpload'
                        onChange={props.onFileChange}
                        name="fileUpload"
                        // capture
                    />
                </div>
            </div>


            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    );
}

export default ItemForm;