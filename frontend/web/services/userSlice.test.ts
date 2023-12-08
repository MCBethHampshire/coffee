import { reducer, initialState, login, logout } from "./userSlice";
import { mockUser, ValidationError } from "../mocks/user";
import { storeCreator as globalStoreCreator } from "../store";

const rootReducer = {
    user: reducer,
};

const storeCreator = () => globalStoreCreator(rootReducer);

const updatedState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
};

const loginData = {
  identifier: mockUser.user.email,
  password: mockUser.user.password,
};

const requestId: string = "someoid";

describe("User slice check", () => {
  describe("Login state flow", () => {
    it("should set the request state to pending", () => {
      expect(
        reducer(initialState, login.pending(requestId, loginData))
      ).toEqual({
        ...initialState,
        requestState: "pending",
      });
    });

    it("should set the request state to fulfilled and reset any previous errors", () => {
      expect(
        reducer(
          {
            ...initialState,
            error: {
              message: "Rejected",
            },
          },
          login.fulfilled(
            {
              jwt: updatedState.jwt,
              user: {
                username: updatedState.username,
                email: updatedState.email,
              },
            },
            requestId,
            loginData
          )
        )
      ).toEqual({
        ...updatedState,
        requestState: "fulfilled",
      });
    });

    it("should set the request state to rejected", () => {
        const payloadError = { error: {name: "500", message: "Server error" } };

        expect(
            reducer(
                initialState,
                login.rejected({} as Error, requestId, loginData, payloadError)
            )
        ).toEqual({
            ...initialState,
            error: payloadError.error,
            requestState: "rejected"
        });
    });
  });

  describe("Login async flow", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("success login flow", async () => {
        const store = storeCreator();
        const stateBeforeLogin = store.getState();

        expect(stateBeforeLogin).toEqual({
            user: {
                ...initialState,
            },
        });

        await store.dispatch(login(loginData));
        const storeAfterLogin = store.getState();

        expect(storeAfterLogin).toEqual({
            user: {
                ...updatedState,
                requestState: "fulfilled",
            },
        });

        //Check local storage
        expect(localStorage.getItem("jwt")).toBe(mockUser.jwt);
        expect(localStorage.getItem("username")).toBe(mockUser.user.username);
        expect(localStorage.getItem("email")).toBe(mockUser.user.email);
    });

    it("fail login flow", async () => {
        const store = storeCreator();
        await store.dispatch(login({
            ...loginData,
            password: "wrongpassword"
        }));
        const state = store.getState();

        expect(state).toEqual({
            user: {
                ...initialState,
                requestState: "rejected",
                ...ValidationError
            }
        });
    });

    it("login flow with saved jwt", async () => {
        //Set jwt token
        localStorage.setItem("jwt", mockUser.jwt);

        const store = storeCreator();
        await store.dispatch(login({}));
        const state = store.getState();

        expect(state).toEqual({
            user: {
                ...updatedState,
                requestState: "fulfilled"
            }
        });
    });
  });

  describe("Logout flow", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should logout action", async () => {
        //Login
        const store = storeCreator();
        await store.dispatch(login(loginData));
        const stateAfterLogin = store.getState();
        expect(stateAfterLogin).toEqual({
            user: {
                ...updatedState,
                requestState:"fulfilled",
            },
        });

        expect(localStorage.getItem("jwt")).toBe(mockUser.jwt);
        expect(localStorage.getItem("username")).toBe(mockUser.user.username);
        expect(localStorage.getItem("email")).toBe(mockUser.user.email);

        //Logout

        await store.dispatch(logout());

        const stateAfterLogout = store.getState();
        expect(stateAfterLogout).toEqual({
            user: {
                ...initialState,
            },
        });

        expect(localStorage.getItem("jwt")).toBe(null);
        expect(localStorage.getItem("username")).toBe(null);
        expect(localStorage.getItem("email")).toBe(null);
    });



    
  });
});
