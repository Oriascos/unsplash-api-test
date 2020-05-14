import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Photo extends Component{
    state = {
        photo: {},
        imagen: {},
    };

    async componentDidMount(){
        //captura el id que viene como parámetro para consultar sus detalles
        const {id} = this.props.match.params;
        const {...response} = await api.get(`/${id}/?client_id=#`);
        this.setState({ photo: response.data, imagen: response.data.urls });
    }

    render(){
        const { photo, imagen } = this.state;
        return(
            <div className="photo-info">
                <h1>{ (photo.description == null) ? photo.alt_description : photo.description }</h1>                      
                <img src={imagen.small}></img>
            </div>
        )
    }
}