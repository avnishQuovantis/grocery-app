import { render } from "@testing-library/react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import Heading from "../component/Heading"
import App from "../App"
// import store  from "../redux-counter/store"
import '@testing-library/jest-dom/extend-expect'
import { screen,fireEvent, getByText } from "@testing-library/dom"
import reducer from "../reducer/reducer"
function renderWithRedux(
    ui,
    {initialState, store = createStore(reducer, initialState)} = {},
  ) {
    return {
      ...render(<Provider store={store}>{ui}</Provider>),
      // adding `store` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      store,
    }
  }
  describe(" Heading component ",()=>{
      test('click basket icon will open cart page', () => {
        const {getByTestId} = renderWithRedux(
          <App />,
        )
        fireEvent.click(getByTestId("basket"))
        expect(getByTestId("cartHeading").textContent).toEqual("Cart",{expect:true})
      })
      test('click login icon will open login page or not ', () => {
          const {getByTestId}=renderWithRedux(<App/>)
          fireEvent.click(getByTestId("loginSignup"))
          fireEvent.click(getByTestId("login"))
          expect(getByTestId("loginTitle").textContent).toEqual("Login")
      })
      test('click signup icon will open signup page or not ', () => {
        const {getByTestId}=renderWithRedux(<App/>)
        fireEvent.click(getByTestId("loginSignup"))
        fireEvent.click(getByTestId("signup"))
        expect(getByTestId("signupTitle").textContent).toEqual("SignUp",{expect:false})
    })
    test("search element ",()=>{
        const {getByTestId,getByText}=renderWithRedux(<App/>)
        // fireEvent
        fireEvent.change(getByTestId('search'),{target:{value:"brown"}})
        fireEvent.click(getByTestId("searchBtn"))
        expect(getByText("Brown eggs")).toBeInTheDocument()
    })
    test("click home button to go to home page",()=>{
        const {getByText}=renderWithRedux(<App/>)
        fireEvent.click(getByText("Grocery"))
        expect(getByText("Lowest Price")).toBeInTheDocument()
    })
})
  


