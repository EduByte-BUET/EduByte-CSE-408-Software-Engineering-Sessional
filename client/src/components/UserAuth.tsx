import api from "../api/GeneralAPI";

const UserAuth = async () => {
    let loggedIn = false;
    try {
        loggedIn = await api.get("/user/auth");
    }
    catch (err: any) {
        // User not logged in
        console.log(err);
        loggedIn = false;
    }

    return loggedIn;
};

export default UserAuth;
