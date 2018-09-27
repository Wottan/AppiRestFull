import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users.json",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users.json/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users.json",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users.json/:id",
    controller: UserController,
    action: "remove"
}];