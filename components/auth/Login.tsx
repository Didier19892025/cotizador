

export default function Login() {
  return (
    <>
        <h1>Login</h1>
        {/* Formulario de login */}
        <form>
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Password:</label>
            <input type="password" name="password" required />
            <input type="submit" value="Login" />
            
        </form>
     
    </>
  )
}
