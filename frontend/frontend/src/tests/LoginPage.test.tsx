import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginPage from "../pages/LoginPage";
import { login } from "../features/auth/authSlice";

// Mock login async thunk
jest.mock("../features/auth/authSlice", () => ({
  ...jest.requireActual("../features/auth/authSlice"),
  login: jest.fn(),
}));

const mockStore = configureStore([]);

describe("LoginPage", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null, loading: false, error: null, loggedIn: false, role: null },
    });

    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

  test("renders form inputs and button", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });


});
