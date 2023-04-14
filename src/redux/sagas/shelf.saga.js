import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

function* fetchShelf() {
  try {
    const shelf = yield axios.get("/api/shelf");
    yield put({ type: "SET_SHELF", payload: shelf.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* addShelfItem(action) {
  console.log("inside addShelfItem");
  try {
    yield axios.post("/api/shelf", action.payload);
    yield put({ type: "FETCH_SHELF" });
  } catch (err) {
    console.log("User post request failed", error);
  }
}

function* deleteBook(action){
  console.log('inside deleteBook()');

  // try -> axios DELETE -> GET updated books
  try{
    // delete book where book.id (action.payload) 
    yield axios.delete(`/api/shelf/${action.payload}`)
    console.log(action.payload);
    yield put({type: 'FETCH_SHELF'});
  }catch(err){
    console.log(err);
  }
}

function* shelfSaga() {
  // trigger saga to GET shelf
  yield takeLatest("FETCH_SHELF", fetchShelf);
  // add a new item to the shelf
  yield takeEvery("ADD_SHELF_ITEM", addShelfItem);
  // trigger saga to DELETE shelf
  yield takeEvery("DELETE_BOOK", deleteBook);
}

export default shelfSaga;
