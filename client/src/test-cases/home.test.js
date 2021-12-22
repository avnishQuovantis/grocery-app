import { cleanup, render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Rows from "../component/Rows";
import App from "../App"
import home from "../reducer/home";
import "@testing-library/jest-dom/extend-expect";
import data from "../groceries/data";
import { screen, fireEvent, getByText } from "@testing-library/dom";
import reducer from "../reducer/reducer";
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

afterEach(()=>{
  renderWithRedux(<App/>)
  fireEvent.click(screen.getByText("Grocery"))
  cleanup()
})
describe("testing rows data is displaying ", () => {
 //testing click element
  test("check home data is displaying ", () => {
    const { getByText} = renderWithRedux(<App/>);
    fireEvent.click(getByText("Ricotta"))
    expect(getByText("Ricotta with berry and mint")).toBeInTheDocument()
  });
  //testing catagories
  test("catagory testing Fruits",()=>{
    const {getByText,getAllByTestId}=renderWithRedux(<App/>)
    fireEvent.click(getByText("Fruits"))
    expect(getAllByTestId("itemlist")).toHaveLength(21)
  })
  test("catagory testing vegetables",()=>{
    const {getByText,getAllByTestId}=renderWithRedux(<App/>)
    fireEvent.click(getByText("vegetables"))
    expect(getAllByTestId("itemlist")).toHaveLength(13)
  })
  test("catagory testing dairy",()=>{
    const {getByText,getAllByTestId}=renderWithRedux(<App/>)
    fireEvent.click(getByText("diary"))
    expect(getAllByTestId("itemlist")).toHaveLength(8)
  })
  test("catagory testing meat",()=>{
    const {getByText,getAllByTestId}=renderWithRedux(<App/>)
    fireEvent.click(getByText("Bakery"))
    expect(getAllByTestId("itemlist")).toHaveLength(6)
  })
});
