import React, { useEffect, useState, useMemo } from 'react';
import firebase from "../../base";
import './styles.css';

const Home = ({ history }) => {

  const [data, setData] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('products').get();
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();

  }, []);

  const pushPage = () => {
    history.push("/addNew");
  }

  return (

    <>
      <ul className="spot-list">
        {data.map(data => (
          <li key={data.id}>
            <img style={{maxWidth:'50%', maxHeight:'100%', backgroundSize:'cover', borderRadius:4, display:'block'}} src={(`${data.img}`)}></img>
            <strong>{data.produto}</strong>
            <span>{`${data.descricao}`}</span>
            <h6>{`${data.valor}`}</h6>
            <h2 className="Price">{`${data.valor}`}</h2>
          </li>
        ))}
      </ul>

      <button className="btn" onClick={() => pushPage()}>Cadastrar novo produto</button>
      <button className="btn" onClick={() => firebase.auth().signOut()}>Sign out</button>

    </>

  );
};

export default Home;