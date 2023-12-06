import React from 'react';
import Login from '../components/login';
import { render } from "@testing-library/react";

describe("Login test cases", () => {
    it("Render check", () => {
        const {  container } = render(<Login />);
        expect(container).toBeTruthy();
    });
});