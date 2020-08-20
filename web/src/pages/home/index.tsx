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
                    <h1>Tem resíduos renováveis* que não podem ser colocados no ecoponto mais próximo ?</h1>
                    <p>Coloque junto ao ecoponto, utilize a App para notificar o local e tipo de resíduo, e nós recolhemos.</p>

                    <Link to="/create-point">
                    <span>
                        <FiLogIn/>
                    </span>
                    <strong>
                        Registar um ponto de recolha
                    </strong>
                    </Link>
                    
                    <p className='residuos'>*Baterias, componentes electrónicos, lâmpadas, óleo doméstico, papelão, residuos orgânicos.</p>
                </main>

               
            </div>
        </div>
    )
}

export default Home;