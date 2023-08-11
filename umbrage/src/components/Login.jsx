export const Login = () => {
    return (
        <form>
            <label for="username">Username</label>
            <input type="username" placeholder="youremail@email.com" id="username" name="username"></input>
            <label for="password">Password</label>
            <input type="password" placeholder="********" id="password" name="password"></input>
            <button>Log In</button>
        </form>
    )
}