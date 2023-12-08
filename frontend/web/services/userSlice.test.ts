import { reducer, actions, initialState} from "./userSlice";
import { mockUser } from "../mocks/user";
import { mock } from "node:test";

const updatedState = {
    jwt: mockUser.jwt,
    username: mockUser.user.username,
    email: mockUser.user.email
};

describe("User slice check", () => {
    describe("Update state actions",  () => {
        it("should update the full state", () => {
            expect(reducer(initialState, actions.update(updatedState))).toEqual(
                updatedState
            );
        });
    });
});
