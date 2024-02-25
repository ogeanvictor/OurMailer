import axios from 'axios';
import './App.css'
import { useForm } from 'react-hook-form';

interface FormTypes {
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string,
  to: any,
  subject: string,
  message: string
}

function App() {
  const { register, handleSubmit } = useForm<FormTypes>();

  const fileReader = new FileReader();

  const onSubmit = (data: FormTypes) => {
    data.port == 465 ? data.secure = true : data.secure = false
    if (data.to) {
      fileReader.onload = function () {
        const file = data.to[0];
      }
  
      fileReader.readAsText(data.to[0])
    }

    data.to = fileReader;

    console.log(data)
    axios.post("http://localhost:3001/api/sendEmail", data)
    

  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="host">Host</label>
        <input {...register("host")} />

        <label htmlFor="port">Porta</label>
        <select name="port" id="port">
          <option value={465}>465</option>
          <option value={587}>587</option>
        </select>

        <label htmlFor="user">User</label>
        <input {...register("user")} />

        <label htmlFor="pass">Senha</label>
        <input {...register("pass")} />

        <label htmlFor="to">Destinatários</label>
        <input type='file' {...register("to")} />

        <label htmlFor="subject">Assunto</label>
        <input {...register("subject")} />

        <label htmlFor="message">Mensagem</label>
        <input {...register("message")} />

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
