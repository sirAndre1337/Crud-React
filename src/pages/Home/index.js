import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div>
            <nav class="navbar navbar-light" style={{backgroundColor:"#e3f2fd"}}>
                Home Page
            <Link className="btn btn-primary btn-lg" to="/cadastro">
                Acessar Cadastro
            </Link>
            </nav>
        </div>
    )
}