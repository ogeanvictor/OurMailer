import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="host">Host</label>
        <input {...register("host")} />

        <label htmlFor="port">Porta</label>
        <select {...register("port")} defaultValue={465}>
          <option value={465}>465</option>
          <option value={587}>587</option>
        </select>

        <label htmlFor="user">User</label>
        <input {...register("user")} />

        <label htmlFor="pass">Senha</label>
        <input {...register("pass")} />

        <label htmlFor="to">Destinatários</label>
        <input type='file' {...register("to")} onChange={handleFileChange} />

        <label htmlFor="subject">Assunto</label>
        <input {...register("subject")} />

        <label htmlFor="message">Mensagem</label>
        <input {...register("message")} />

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
