
export default function Logout(){
    const user = JSON.parse(localStorage['user']);

    const logout = () => {
        const endpoint = user.username === "punjabadmin" ? "/punjablogin" : "/login";
        localStorage.clear();
        window.location = endpoint;
    };

    logout();
}

