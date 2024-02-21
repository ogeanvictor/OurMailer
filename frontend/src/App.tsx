import './App.css'

function App() {

  return (
    <>
      <form>
        <label htmlFor="host">Host</label>
        <input type="text" name="host" id="host" />

        <label htmlFor="port">Porta</label>
        <select name="port" id="port">
          <option value="465">465</option>
          <option value="587">587</option>
        </select>

        <label htmlFor="user">User</label>
        <input type="text" name="user" id="user" />

        <label htmlFor="password">Senha</label>
        <input type="text" name="password" id="password" />

        <label htmlFor="recipients">Destinatários</label>
        <input type="file" name="recipients" id="recipients"/>

        <label htmlFor="subject">Assunto</label>
        <input type="text" name="subject" id="subject"/>

        <label htmlFor="message">Mensagem</label>
        <input type="text" name="message" id="message" />

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
