import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import firebase from "../../base";

import './styles.css';

export default function New({ history }) {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [product, setproduct] = useState('');
  const [descricao, setdescricao] = useState('');
  const [price, setPrice] = useState('');

  //ADD PRODUCT TO FIRESTORAGE
  const handlePost = async () => {

    const remoteUri = await uploadPhotoAsync();

    console.log(remoteUri);

    firebase.firestore()
      .collection("products")
      .add({
        produto: product,
        descricao: descricao,
        valor: 'R$ ' + price,
        img: remoteUri,
      })
      .then(ref => {

        history.push("/");

      })
      .catch(error => {
        alert(error);
      });

    history.push("/");

  };

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //UPLOAD PHOTOS TO FIREBASE AND RETURN URL OF IMAGE TO POST FUNCTION
  const uploadPhotoAsync = async uri => {

    const path = `products/${firebase.auth().currentUser.uid}/${image.name}`;

    return new Promise(async (res, rej) => {

      let upload = firebase
        .storage()
        .ref(path)
        .put(image);

      upload.on(
        "state_changed",
        snapshot => { },
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          setUrl(url);
          res(url);
        }
      );
    });
  };

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={image ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={handleChange} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="product">Produto *</label>
      <input
        id="product"
        placeholder="Sua empresa incrível"
        value={product}
        onChange={event => setproduct(event.target.value)}
      />

      <label htmlFor="descricao">Descrição *</label>
      <input
        id="descricao"
        placeholder="Descrição do produto"
        value={descricao}
        onChange={event => setdescricao(event.target.value)}
      />

      <label htmlFor="price">Valor *</label>
      <input
        id="price"
        placeholder="Valor do produto"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn" onClick={handlePost}>Cadastrar</button>
    </form>
  )
}