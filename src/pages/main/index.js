import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';


export default class Main extends Component {
    //Se almacenará el conteo de photoos encontrados
    state = {
        photos: [],
        photoInfo: {},//Almacena info para hacer paginación
        page: 1, //página inicial para paginación
    }

    //Ejecuta inmediatamente después de mostrar el componente en pantalla
    componentDidMount(){
        this.loadPhotos();
    }
    //Se crea la función de esta manera para poder referenciar valores
    loadPhotos = async (page = 1) => {
        //devuelve la respuesta del API
        const response = await api.get(`/?client_id=#&orientation=landscape&page=${page}`);
        const photoInfo = response.data; //Cargamos las dos variables en una sola línea
        this.setState({ photos: photoInfo, page});
    };

    prevPage = () => {
        const { page, photoInfo } = this.state;
        if(page == 1) return;
        const pageNumber = page - 1;
        this.loadPhotos(pageNumber);
    };
    nextPage = () => {
        const { page, photoInfo } = this.state;

        if(page === photoInfo.pages) return;//revuelte el total de páginas (indicado en la API)

        const pageNumber = page + 1;

        this.loadPhotos(pageNumber);
    };  

    render(){
        const { photos, page, photoInfo } = this.state;
        return(
            <div className="photo-list">
                {photos.map(photo=> (
                    //se debe poner el key porque para cada elemento se exige un identificador
                    <article key={photo.id}>
                        <img src={ photo.urls.small }></img>
                        <strong>{ (photo.description == null) ? photo.alt_description : photo.description }</strong>
                        <p><i class="corazon">❤</i> { photo.likes }</p>
                        <Link to={`/photos/${photo.id}`}>Detalles</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page == 1} onClick={this.prevPage}>Volver</button>
                    <button disabled={page == photoInfo.pages} onClick={this.nextPage}>Ver más</button>
                </div>
            </div>
        );
    }
}