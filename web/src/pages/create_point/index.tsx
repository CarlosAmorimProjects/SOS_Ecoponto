import React, { useEffect, useState, FormEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import swal from 'sweetalert';


import './styles.css';

import logo from '../../assets/logo2.png';

interface Item {
    id: number;
    name: string;
    image_url: string;
}


    const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
  //  const [initialPosition, setInitialPosition] = useState<[number, number]>  ([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>  ([0,0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const history = useHistory();

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    // Funcão para centrar o mapa automaticamente na posição do utilizador
    // não estava a ter muita precisão, optei por centrar com coordenadas fixas em Map center
    /*useEffect (() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
                setInitialPosition([latitude, longitude]);
        });
    })*/

    function handleMapClick (event: LeafletMouseEvent) {
        setSelectedPosition ([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleSelectItem (id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems);
        }else {
               
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit (event: FormEvent) {
        event.preventDefault();

        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();

            data.append('latitude', String(latitude));
            data.append('longitude', String (longitude));
            data.append('items', items.join(','))
            
            if (latitude === 0 ) {
                swal({
                    icon: "error",
                    text: "Introduza a localização",
                    buttons: ['Sair'],
                  });
            }

            else if ( Array.isArray(items) && !items.length) {
                swal({
                    icon: "error",
                    text: "Selecione o tipo de resíduo a recolher",
                    buttons: ['Sair'],
                  });
            }

            else {
                await api.post('points', data);
                swal({
                    icon: "success",
                    text: "Ponto de recolha registado",
                    buttons: ['Sair'],
                  });
                history.push('/');
            }
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt='logo'/>
                <Link to='/' >
                    <FiArrowLeft/>
                    Voltar à pagina principal    
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1> Registo do <br/> ponto de recolha </h1>
                <h3>Selecione o endereço no mapa:</h3>

                    <Map center={[41.5325322, -8.7791847]} zoom={15} onclick={handleMapClick}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={selectedPosition} />
                    </Map>
                <fieldset>
                    <legend>
                        <h2>Resíduos depositados:</h2>
                        <span>Selecione um ou mais tipos de resíduos abaixo</span>
                    </legend>

                     <ul className="items-grid">
                         {items.map(item => (
                         <li
                          key={item.id} 
                          onClick={() => handleSelectItem(item.id)}
                          className={selectedItems.includes(item.id) ? 'selected': ''}
                          >
                             <img src= {item.image_url} alt={item.name} />
                             <span>{item.name}</span>
                         </li>
                         ))}
                     </ul>
                </fieldset>
                <button type='submit'>
                    Registar ponto de recolha 
                </button>
            </form>
        </div>
    )
};

export default CreatePoint;