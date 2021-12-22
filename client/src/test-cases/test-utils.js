import Home from "../component/Home"
import { shallow } from "enzyme";
import { createStore } from "redux";
import {Provider} from "react-redux";
import {  render as rtlRender } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import home from "../reducer/home"
import "@testing-library/jest-dom"
import { configureStore } from "@reduxjs/toolkit";

  function render(ui,{ initialState,
    store = configureStore({reducer:home,initialState}),...renderOptions } = {},) 
   {
      function wrapper({children}){
         return <Provider store={store}>{children}</Provider>
      }
    return rtlRender(ui,{wrapper:wrapper,...renderOptions})
  }

export * from '@testing-library/react'
export {render}

