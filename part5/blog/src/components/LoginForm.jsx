const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => (
  <>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin} id="loginForm">
      <div>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="username"
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

export default LoginForm