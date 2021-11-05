import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faSave, faTrash, faUserEdit, faUserMinus } from '@fortawesome/free-solid-svg-icons'

export default function Cadastro() {

    const [dados, setDados] = useState([])
    const [nome, setNome] = useState('')
    const [id, setId] = useState('')
    const [idade, setIdade] = useState(0)
    const [nomePesquisado, setNomePesquisado] = useState('')

    const editar = (paramId, paramNome, paramIdade) => {
        setId(paramId)
        setNome(paramNome)
        setIdade(paramIdade)
    }

    const fetchData = () => {
        axios.get('http://localhost:8080/springboot-rest-api-sample/findAll')
            .then(result => setDados(result.data))
    }

    const deletaUsuarioPorId = (paramId) => {
        console.log('Testnado valor : ' + paramId)

        if (paramId === undefined) {

            axios.delete('http://localhost:8080/springboot-rest-api-sample/api/v1/delete?id=' + id)
                .then(() => fetchData())
                .then(() => limparCampos())
        } else {
            axios.delete('http://localhost:8080/springboot-rest-api-sample/api/v1/delete?id=' + paramId)
                .then(() => fetchData())
                .then(() => limparCampos())
        }
    }

    const salvarUsuario = () => {
        console.log('Tentando salvar : ' + nome + ' , ' + idade)
        axios.post('http://localhost:8080/springboot-rest-api-sample/api/v1/save', {
            id: id,
            nome: nome,
            idade: idade
        })
            .then((response) => {
                fetchData()
                setId(response.data.id)
            }, (error) => {
                console.log(error);
            });
    }

    const limparCampos = () => {
        setNome('')
        setId('')
        setIdade(0)
    }

    useEffect(() => {
        console.log('Entrou aqui')
        fetchData()
    }, [])

    const buscarNome = (evento) => {
        setNomePesquisado(evento)
    }

    const foiBuscado = (paramNomePesquisado) => {
        return (item) => {
            return item.nome.toLowerCase().includes(paramNomePesquisado.toLowerCase());
        }
    }

    return (
        <div>
            <nav class="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <h3>Pagina de Cadastro</h3>
            </nav>
            <form className="py-2 px-1">
                <div className="form-group">
                    <label>ID</label>
                    <input type="text" className="form-control" value={id} onChange={(e) => { setId(e.target.value) }} disabled />
                </div>
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" className="form-control" value={nome} onChange={(e) => { setNome(e.target.value) }} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Idade</label>
                    <input type="number" className="form-control" value={idade} onChange={(e) => { setIdade(e.target.value) }} placeholder="Idade" />
                </div>
                <button type="button" className="btn btn-primary" onClick={() => { salvarUsuario() }}><FontAwesomeIcon icon={faSave} fixedWidth /> Salvar</button>
                <span className="px-1">
                    <button type="button" className="btn btn-secondary" onClick={() => { limparCampos() }}><FontAwesomeIcon icon={faEraser} fixedWidth /> Limpar</button>
                </span>
                <button type="button" className="btn btn-danger" onClick={() => { deletaUsuarioPorId() }}><FontAwesomeIcon icon={faTrash} fixedWidth /> Exluir</button>
            </form>
            <div className="row">
                <div className="col">
                    <h5>Lista de usuários cadastrados</h5>
                </div>
                <div className="col-md-auto">
                    Pesquisar Usuario :
                </div>
                <div className="col-sm-3">
                    <input type="text" onChange={(e) => buscarNome(e.target.value)} />
                </div>
            </div>
            <div className="card-block table-border-style">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {dados.filter(foiBuscado(nomePesquisado)).map((dado) => {
                        console.log(dado)
                        return (
                            <tbody key={dado.id}>
                                <tr>
                                    <td>{dado.id}</td>
                                    <td>{dado.nome}</td>
                                    <td>{dado.idade}</td>
                                    <td><span style={{ cursor: 'pointer' }} onClick={() => editar(dado.id, dado.nome, dado.idade)}>
                                        <FontAwesomeIcon icon={faUserEdit} title="Editar Usuario" />
                                    </span>
                                    </td>
                                    <td><span style={{ cursor: 'pointer' }} onClick={() => deletaUsuarioPorId(dado.id)}>
                                        <FontAwesomeIcon icon={faUserMinus} title="Excluir Usuario" />
                                    </span>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}