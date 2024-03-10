import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './Form.css';

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

function Form() {
  const { register, handleSubmit } = useForm<FormTypes>();
  const [file, setFile] = useState<File | null>(null);
  const [senders, setSenders] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const onSubmit = async (data: FormTypes) => {
    setLoading(true);
    data.port = Number(data.port)
    data.port == 465 ? data.secure = true : data.secure = false;
    
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await fetch("http://localhost:3001/api/uploadFile", {
          method: "POST",
          body: formData
        })

        await axios.post("http://localhost:3001/api/sendEmail", data).then((response) => {
          setSenders(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>

        <h2>Configuração</h2>
        <div className='configs'>
          <div className='box'>
            <label htmlFor="host">Host: </label>
            <input className='input' {...register("host")} placeholder='Host' />
          </div>

          <div className='box'>
          <label htmlFor="port">Porta: </label>
          <select id='port' {...register("port")} defaultValue={465}>
            <option value={465}>465</option>
            <option value={587}>587</option>
          </select>
          </div>

          <div className='box'>
            <label htmlFor="user">Email: </label>
            <input className='input' {...register("user")} placeholder='Email' />
          </div>

          <div className='box'>
            <label htmlFor="pass">Senha: </label>
            <input className='input' {...register("pass")} placeholder='Senha' />
          </div>
        </div>

        <h2>Conteúdo</h2>
        <div className='content'>
          <div className='box'>
            <label htmlFor="to">Destinatários: </label>
            <input className='input' type='file' {...register("to")} onChange={handleFileChange} />
          </div>
          
          <div className='box'>
            <label htmlFor="subject">Assunto: </label>
            <input className='input' id='subject' {...register("subject")} />
          </div>
        </div>
        
        <div className='message'>
          <div className='box' id='message-content'>
            <label htmlFor="message">Mensagem: </label>
            <input className='input' id='message-input' {...register("message")} />
          </div>
        </div>
        
        <input type="submit" value="Submit" />
      </form>

      {loading ? (
        <p>
          Enviando emails ...
        </p> 
        ) : (
          <p>{senders}</p>
        )
      }
    </>
  )
}

export default Form
