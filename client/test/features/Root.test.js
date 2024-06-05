import React from "react";
import { render, screen } from "@testing-library/react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Root from "./Root";

jest.mock('react-cookie');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe("Root", () => {
    test("renders without error", () => {
        render(<Root />);
        expect(screen.getByTestId("root-component")).toBeInTheDocument();
    });

    test("navigates to /join when token is not present", () => {
        useCookies.mockReturnValueOnce([{ token: "" }]);
        const navigate = jest.fn();
        useNavigate.mockReturnValueOnce(navigate);

        render(<Root />);

        expect(navigate).toHaveBeenCalledWith("/join");
    });

    test("navigates to /chat when token is present", () => {
        useCookies.mockReturnValueOnce([{ token: "abc123" }]);
        const navigate = jest.fn();
        useNavigate.mockReturnValueOnce(navigate);

        render(<Root />);

        expect(navigate).toHaveBeenCalledWith("/chat");
    });
});