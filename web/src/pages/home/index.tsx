import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo2.png';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                <img src={logo} alt='logo'/>
                </header>

                <main>
                    <h1>Tem residuos renováveis* que não podem ser colocados no ecoponto mais próximo ?</h1>
                    <p>Coloque junto ao ecoponto, utilize a App para notificar o local e tipo de residuos, e nós recolhemos.</p>

                    <Link to="/create-point">
                    <span>
                        <FiLogIn/>
                    </span>
                    <strong>
                        Registar um ponto de recolha
                    </strong>
                    </Link>
                    
                    <p className='residuos'>*Baterias, Componentes electrónicos, Lâmpadas, Óleo doméstico, Papelão, Residuos orgânicos.</p>
                </main>

               
            </div>
        </div>
    )
}

export default Home;