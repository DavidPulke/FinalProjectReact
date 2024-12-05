import { User } from "../interfaces/User"



// App State
export class UsersState {
    public Users: User[] = []
}

// Action Type
export enum UsersActionType {
    CreateUser = "CreateUser",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser",
    SetAllUsers = "SetAllUsers",
    FilterUsers = "FilterUsers",
}

// Action
export interface UsersAction {
    type: UsersActionType;
    payload: any
}


// Action Creators
export function addUserAction(User: User): UsersAction {
    return { type: UsersActionType.CreateUser, payload: User }
}

export function updateUserAction(User: User): UsersAction {
    return { type: UsersActionType.UpdateUser, payload: User }
}

export function deleteUserAction(_id: number): UsersAction {
    return { type: UsersActionType.DeleteUser, payload: _id }
}

export function setAllUsersAction(Users: User[]): UsersAction {
    return { type: UsersActionType.SetAllUsers, payload: Users }
}

export function filterUsersAction(filteredUsers: User[]): UsersAction {
    return { type: UsersActionType.FilterUsers, payload: filteredUsers };
}

// reducer
export function UsersReducer(currentState: UsersState = new UsersState(), action: UsersAction): UsersState {
    const newState = { ...currentState, Users: [...currentState.Users] };

    switch (action.type) {
        case UsersActionType.CreateUser:
            newState.Users.push(action.payload);
            break;

        case UsersActionType.UpdateUser:
            const indexToUpdate = newState.Users.findIndex((User) => User._id === action.payload._id);
            if (indexToUpdate !== -1) {
                newState.Users[indexToUpdate] = action.payload;
            }
            break;

        case UsersActionType.DeleteUser:
            newState.Users = newState.Users.filter((User) => User._id !== action.payload);
            break;

        case UsersActionType.SetAllUsers:
            newState.Users = action.payload;
            break;

        case UsersActionType.FilterUsers:
            newState.Users = action.payload;
            break;

        default:
            break;
    }

    return newState;
}


