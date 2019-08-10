import React from "react";

function ItemForm() {
    return (
        <form className="itemform">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <div className="field">
                    <input
                        id="title"
                        type="text"
                        name="title"
                        className="form-control"
                        value=""
                    />
                </div>
            </div>

            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    );
}

export default ItemForm;