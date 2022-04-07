import styles from '../styles/app.module.scss';
import Image from 'next/image'
import { useState } from 'react';
import {api} from '../services/api';
import Modal from 'react-modal';
import {FaTimes} from 'react-icons/fa';


export default function Home() {
  const[nome, setNome] = useState<string>('');
    const[email, setEmail] = useState<string>('');
    const[OP, setOP] = useState<boolean>();
    
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [putSucesso, setPutSucesso] = useState<boolean>(false)

    let[presenca, setPresenca] = useState<boolean>(null)

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
        setPutSucesso(false);
    }

    let EMAIL :string;

    const handlePut = (email: typeof EMAIL)=>{
        const data = {
            EMAIL: email,
            PRESENCA: OP
        }
        api.put('/usuarios/' + data.EMAIL)
        .then(res =>{
            if(!putSucesso){
                setPutSucesso(true)
                setSucesso(false)
            }
            if(res.status == 200){
                setPresenca(presenca? presenca=false: presenca=true)
            }
            console.log("opção: " + presenca)
        })
        .catch(error => {
            console.log("ERROR DEU AQUI" + data.EMAIL)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            NOME: nome,
            EMAIL: email,
            PRESENCA: OP
        }
        console.log(data)
        api.post('/usuarios', data)
        .then(response => 
            {
                if(response.status == 201){
                setSucesso(true)
                }
            }
        )
        .catch(error => {
            setSucesso(false)
        })
        openModal()
    }
  return (
    <div className={styles.container}>
      <div className={styles.imagem}>
        <Image src='/nome.png' alt='Logo' width={330} height={280}/>
      </div>
      <div className={styles.formulario}>
          <div className={styles.linha}>
          </div>
              <div className={styles.format_form}>
                  <p>
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
                    Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced 
                    in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                  </p><br></br>
                  <form method="POST" onSubmit={e => handleSubmit(e)}>
                      <label>Nome: </label><br></br>
                      <input type="text" name="NOME" value={nome} onChange={e => setNome(e.target.value)} required/><br></br><br></br>
                      <label> E-mail: </label><br></br>
                      <input type="email" name="EMAIL" value={email} onChange={e => setEmail(e.target.value)} required/><br></br><br></br>
                      <label>Confirmar presença: </label><br></br>
                      <div className={styles.options}>
                          <input name="OP" type="radio" value={'true'} onChange={e => setOP(e.isTrusted)} required/>
                          <label> Vou</label><br></br>
                          <input name="OP" type="radio" value={'false'} onChange={e => setOP(e.isTrusted == false)} required/>
                          <label> NÃO vou</label><br></br>
                      </div><br></br>
                      <div className={styles.container_confirma}>
                          <button className={styles.confirma} type="submit" value="Enviar Resposta">Enviar</button>
                      </div>
                  </form>
                    {/* <Link href="/presentes">Lista de presentes</Link>
                  <Link href="/convidados">convidados</Link> */}
              </div>
      </div>
    </div>
  )
}
