import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ShelfPage() {
  // declare useDispatch so we can trigger our sagas to GET and POST our shelf
  const dispatch = useDispatch();
  // make shelf accessible from store/reducer
  const shelf = useSelector((store) => store.shelf);
  // GET shelf immediately so we can display it on initial load
  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);

  // declare local state
  let [newItem, setNewItem] = useState({ description: "", image_url: "" });
  // function that runs on form submit
  const addNewItem = (event) => {
    event.preventDefault();
    console.log("inside addNewItem()");
    // dispatch POST
    dispatch({
      type: "ADD_SHELF_ITEM",
      payload: newItem,
    });
    // reset newItem
    setNewItem({ description: "", image_url: "" });
  };
  // handle change of description input field
  const handleDescriptionChange = (event) => {
    console.log(newItem.description);
    setNewItem({ ...newItem, description: event.target.value });
    console.log("inside handleDescriptionChange");
  };
  // handle change of image_url input field
  const handleUrlChange = (event) => {
    setNewItem({ ...newItem, image_url: event.target.value });
    console.log("inside handleUrlChange", newItem.image_url);
  };

  
  // NOTES: need event.preventDefault(); look into {JSON.stringify(newItem)}
  return (
    <div className="container">
      <h2>Shelf</h2>
      {/* display shelf on load */}
      <div>
        {shelf.map((book) => 
          <div key={book.id}>
            <div>{book.description}</div>
            <img src={book.image_url} />
            {/* dispatch on the inside of the onClick so that book.id is still 
            accessable to dispatch vs creating state or calling function onClick */}
            <button onClick={() => {dispatch({type: 'DELETE_BOOK', payload: book.id})}}>Delete</button>
          </div>
        )}
      </div>
      {/* Add item form */}
      <form onSubmit={addNewItem}>
        <input
          type="text"
          placeholder="description"
          value={newItem.description}
          onChange={handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="image url"
          value={newItem.image_url}
          onChange={handleUrlChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ShelfPage;
