import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import logo from '../../images/logo.svg';
import axios from 'axios';

const DetailsProduit = (props) => {

    const params = useParams();
    const [prix, setPrix] = useState(0);
    const [message, setMessage] = useState('');
    const [produit, setProduit] = useState([]);
    const [loading, setLoading] = useState(true);
    const { startingMinutes = 90, startingSeconds = 0 } = props;
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);

    const styleProduit = {
        // display: 'block',
        fontWeight: 'bold'
    }
    const centerImage = {
        // display: 'block',
        margin: '4px auto'
    }

        useEffect(() => {
        let sampleInterval = setInterval(() => {
          if (secs > 0) {
            setSeconds(secs - 1);
          }
          if (secs === 0) {
            if (mins === 0) {
              clearInterval(sampleInterval);
            } else {
              setMinutes(mins - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => {
          clearInterval(sampleInterval);
        };
      });


    useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/produit-detail/${params.produit_id}`,
            { 
                headers: {"Authorization" : `Bearer ${params.token}`} 
            }
        )
        .then(response => {
            setProduit(response.data.produit);
            setLoading(false);
        }
        );
    }, []);

    const saveEnchere = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            `http://127.0.0.1:8000/api/produit-detail/${params.produit_id}?prix_enchere=`+ prix,
            { 
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${params.token}`
                } 
            }
        );
        if(response.data.status === 0) {
            console.log(response.data.enchere);
            setPrix(0);
            setMessage('Enchère placée');
        }
    }


    return (
        <div className='container m-5'>
            {
                loading && 
                <div className='loading m-5 p-5'><img className='rotate' src={logo} />
                    {/* <h2 className='m-5 p-5'>Chargement</h2> */}
                </div>
            }
            <h1 className='text-center'>Détails de l'article</h1>
            <div className='d-flex justify-content-between mt-5 ml-lg-5 mr-lg-5'>
                <div>
                    <h4 className='text-info' style={styleProduit}>{ produit.nom_produit }</h4>
                </div>      
                <div>
                    {!(mins && secs) ? "" : (
                        <p>
                        {" "}
                        <span>Temps restant</span> :  <b className='text-danger'>{mins} m {secs < 10 ? `0${secs} s` : secs +' s' }</b>
                        </p>
                    )}
                </div>
     
            </div>
            <div className='d-flex justify-content-rounded mt-5 ml-lg-5 mr-lg-5'>
                <div>
                    <img src={produit.image_produit} height={220} className="rounded rounded-lg" style= {centerImage} alt={produit.nom_produit} />
                </div>      
                <div className='ml-5'>
                    <div>
                        <h2>Description</h2>
                        <p className='mt-2'>{ produit.description_produit } .</p>
                        <h4 className='mt-5'>{ produit.prix } FCFA</h4>
                    </div>
                </div>
                <div className='ml-5'>
                <form className="form-inline" action="">
                    <div className="ml-2 d-grid">
                            <input className="btn btn-info btn-rounded waves-effect waves-light" type="submit" value="Enchère auto" />
                    </div>
                </form>
                </div>   
            </div>
            <div className="p-2 row">
                <form onSubmit={saveEnchere} className="form-inline" action="">
                    <div className="form-group ml-2">
                        <label className='mr-5'>Entrez votre prix : </label>
                        <input type="integer" name='prix' onChange={(e) => setPrix(e.target.value)} value={prix} className="form-control" required/>
                    </div>
                        
                    <div className="ml-2 d-grid">
                        <input className="btn btn-success btn-rounded waves-effect waves-light" type="submit" value="Soumettre" />
                    </div>
                </form>
            </div>   
        </div>
    );
}

export default DetailsProduit;