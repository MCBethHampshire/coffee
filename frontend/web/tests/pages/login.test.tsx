import React from 'react';
import Login from '../../pages/login';
import { render, screen, act, fireEvent } from "@testing-library/react";

describe("Login test cases", () => {
    it("Render check", () => {
        const {  container } = render(<Login />);
        expect(container).toBeTruthy();
    });

    it("Validation check no input", async () => {
        render(<Login />);

        const submitButton = screen.getByRole("button", { name: "Sign in" });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(screen.getAllByText("Required")).toHaveLength(2);
    });

    it("Validation check - less than 6 and 8", async () => {
        render(<Login />);

        const submitButton = screen.getByRole("button", { name: "Sign in" });
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const emailInput = screen.getByPlaceholderText("Enter your email")
        const value = 'four';

        fireEvent.change(passwordInput, {
            target: {
                value
            }
        });

        fireEvent.change(emailInput, {
            target: {
                value
            }
        });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(screen.getAllByText("Min length 8")).toHaveLength(1);
        expect(screen.getAllByText("Min length 6")).toHaveLength(1);
    });

    it("Validation check - invalid email", async () => {
        render(<Login />);

        const submitButton = screen.getByRole("button", { name: "Sign in" });
        const emailInput = screen.getByPlaceholderText("Enter your email")
        const value = 'test@test.c';

        fireEvent.change(emailInput, {
            target: {
                value
            }
        });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(screen.getAllByText("Invalid email address")).toHaveLength(1);
    });
});