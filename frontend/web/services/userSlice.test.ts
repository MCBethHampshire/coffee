import { reducer, actions, initialState} from "./userSlice";
import { mockUser } from "../mocks/user";

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

        it("should only update the jwt", () => {
            expect(
                reducer(
                    initialState, 
                    actions.update({
                        jwt: updatedState.jwt,
                    })
                )
            ).toEqual({
                ...initialState,
                jwt: updatedState.jwt,
            });
        });

        it("should clear the state", () => {
            const stateWithUpdatedValues = reducer(
                initialState,
                actions.update(updatedState)
            );

            expect(stateWithUpdatedValues).toEqual(updatedState);

            expect(reducer(stateWithUpdatedValues, actions.clear())).toEqual({
                jwt: "",
                username: "",
                email: "",
            });
        });
    });
});

