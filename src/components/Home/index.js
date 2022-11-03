import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router';
const Home = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const current_date = new Date();

    const saveConnection = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://127.0.0.1:8000/api/login?email='+ email+'&password='+password);
        if(response.data.status === 200) {
            var token = response.data.access_token;
            var user_name = response.data.user_name;
            var user_id = response.data.user_id;
            console.log(response.data.message + '; \n token : ' + response.data.access_token);
            setEmail('');
            setPassword('');
            navigate(`welcome/${token}/${user_name}/${user_id}`);
        } else {
            navigate('/');
        }
    }

    // render() {
        return (
            <div>
                <div className="account-pages my-5 pt-sm-5">
                    <div className="container">
                        <div className="row justify-content-center rounded rounded-lg">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                 <div className="card overflow-hidden">
                                    <div className="bg-info bg-soft">
                                        <div className="row">
                                            <div className="col-7">
                                                <div className="text-white p-4">
                                                    <h5 className="text-white text-white">Bon retour !</h5>
                                                    <p>Connectez-vous pour commencer la vente aux enchères.</p>
                                                </div>
                                            </div>
                                            <div className="col-5 align-self-end">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0"> 
                                        
                                        <div className="p-2">
                                            <form onSubmit={saveConnection} className="form-horizontal" action="">
                                                <div className="form-group mb-3">
                                                    <label>Email</label>
                                                    <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" required autoComplete="off"/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Mot de passe</label>
                                                    <input type="text" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" required autoComplete="off"/>
                                                </div>
                                                <div className="mt-3 d-grid">
                                                    <input className="btn btn-success btn-rounded waves-effect waves-light" type="submit" value="Se connecter" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                    <div className="mt-5 text-center">
                                        <div>
                                            <p className="text-dark">© <span>{current_date.getFullYear()}</span> test.developpeur.junior par Teguimene</p>
                                         </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    // }
}

export default Home;