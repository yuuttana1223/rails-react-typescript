import "./App.css";
import { VFC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Orders } from "containers/Orders";
import { Restaurants } from "containers/Restaurants";
import { Foods } from "containers/Foods";
import { NotFound } from "containers/NotFound";

export const App: VFC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="restaurants">
            <Route index element={<Restaurants />} />
            <Route path=":restaurantId/foods" element={<Foods />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
