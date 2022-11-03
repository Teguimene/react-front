import React,  { Component, useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { useNavigate} from 'react-router';

import axios from 'axios';

const Welcome = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [produits, setProduit] = useState([]);
    const [loading, setLoading] = useState(true);
    const current_date = new Date();

    const centerImage = {
        // display: 'block',
        margin: '4px auto'
    }

   useEffect(() =>  {
        axios.get(
            'http://127.0.0.1:8000/api/produits',
            { 
                headers: {"Authorization" : `Bearer ${params.token}`} 
            }
        )
        .then(response => {
                setProduit(response.data.produits[0].data);
                setLoading(false);
            }
        );
    }, []);

    var produit_HTML = "";
        if(loading && params.token == '') {
            produit_HTML = <h2>Chargement...</h2>;
        } else {
            produit_HTML = 
            produits.map((item) => {
                return(
                  <div key={item.id} className="m-3">
                    <Link to={`/produit/${item.id}/${params.token}`}>
                        <img src={item.image_produit} height={220} className="rounded rounded-lg" style= {centerImage} alt='image' />
                    </Link>
                    <div className='justify-content-center'>
                        <h4 className='text-center'>{item.nom_produit}</h4>
                        <p className='text-center'>{item.prix} FCFA</p>
                    </div>
                  </div>  
                );
            });
        }

    return(
            <div className='container-fluid'>
                <div className='d-flex justify-content-between m-4'>
                    <h2>VenteAuxEncheres</h2>
                    <button className='btn btn-danger'
                    onClick={ () => {
                            axios.post(
                                'http://127.0.0.1:8000/api/logout',
                                { 
                                    headers: {"Authorization" : `Bearer ${params.token}`} 
                                }
                            ).then(() => {
                                navigate('/');
                            })
                        }
                    }
                    >Se Déconnecter</button>
                </div>
                <div className='container jsutify-content-center'>
                    <center>Bienvenu à la vente aux enchères <b>{params.user_name} .</b>
                        Il est question de choisir un produit et de proposer la somme la plus élevée pour l'obtenir. 
                        Qu'est-ce que vous attendez ? Lancez-vous et rentrez avec un de nos produits
                    </center> 
                </div>
                <div>
                    <div className='d-flex justify-content-between mt-5 ml-lg-5 mr-lg-5'>
                        <form className='form-online'>
                            <div className="form-group">
                                <input type="search" className="form-control rounded-lg" placeholder="Rechercher un article" autoComplete="on" />
                            </div>
                        </form>

                        <form className='form-online'>
                            <div className="form-group mb-3">
                                <select className='form-control'>
                                    <option value="">--- Filtrer ---</option>
                                    <option value="20000">20000</option>
                                    <option value="30000">30000</option>
                                    <option value="40000">40000</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        {produit_HTML}
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <div>
                        <p className="text-dark">© <span>{current_date.getFullYear()}</span> test.developpeur.junior par Teguimene</p>
                        </div>
                </div>
            </div>
        );
}

export default Welcome;