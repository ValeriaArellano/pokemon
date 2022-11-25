import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./pokemon.module.scss";
import Stats from "../../components/stats/index";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
import axios from "axios";

export const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [edit, setEdit] = useState(false);
  const [changeImg, setChangeImg] = useState(false);
  const history = useHistory();
  const options = useSelector((store) => store.types);

  const [data, setData] = useState({
    name: "",
    life: '',
    strength: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
    img: "",
  });


  const [list, setList] = useState([]);
  let toastProperties = null;
  const showToast = (type, description) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Success",
          description: description,
          backgroundColor: "#5cb85c",
        };
        break;
      case "danger":
        toastProperties = {
          id: list.length + 1,
          title: "Error",
          description: description,
          backgroundColor: "#d9534f",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  useEffect(() => {
    async function detalles() {
      const data = await fetch(`https://pokemonnnnn.fly.dev/pokemons/${id}`);
      const pokemon = await data.json();
      setPokemon(pokemon);
    }
    detalles();
  }, [id]);

  const editPokemon = () => {
    if (Number(id)) {
      return alert("This pokemon can't be edited");
    } else {
      setEdit(true);
    }
  };

  const deletePokemon = () => {
    if (Number(id)) {
      return alert("This pokemon can't be deleted");
    } else {
      axios.delete(`https://pokemonnnnn.fly.dev/pokemons/${id}`).then((response) => {
        console.log(response.data);
        if (response.data.info === "Pokemon deleted!") {
          showToast("success", response.data.info);
          history.push("/home");
        }
      }).catch(e=>{
        console.log(e)
      });
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name !== "name" && e.target.name !== "img") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const checkbox = (e) => {
    if (data.types.includes(e.target.value)) {
      data.types = data.types.filter((id) => id !== e.target.value);
      setData({
        ...data,
        types: data.types,
      });
    } else {
      setData({
        ...data,
        types: [...data.types, e.target.value],
      });
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8080/pokemons/${id}`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.info === "Pokemon edited!") {
          showToast("success", response.data.info);
          setEdit(false);
          window.location.reload();
        } 
          
        
        setData({
          name: "",
          life: "",
          strength: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          types: [],
          img: "",
        });
        setEdit(false);
      })
      .catch((e) => console.log(e));
  };

  

  return (
    <>
      {edit ? (
        <>
          <form className={style.container}>
            <div className={style.name_container}>
              <h1 className={style.name_container__h1}>#{pokemon.id}</h1>
              <input
                className={style.name_container__input_name}
                type="text"
                name="name"
                value={data.name}
                placeholder={pokemon.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className={style.img}>
              <div style={{marginTop: '15px',cursor: 'pointer', display: 'flex', flexDirection: 'column'}}>
                {changeImg ? (
                  <input
                  style={{backgroundColor: 'transparent'}}
                    type="text"
                    name="img"
                    placeholder="image link"
                    value={data.img}
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : null}
                <img
                 onClick={() => setChangeImg(!changeImg)}
                  src={
                    data.img
                      ? data.img
                      : pokemon.img
                      ? pokemon.img
                      : "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"
                  }
                  alt="pokemon"
                />
              </div>
              <div className={style.parrafo}>
                <p>
                  weight:
                  <input
                  style={{backgroundColor: 'transparent', width: '30%'}}
                    type="number"
                    name="weight"
                    value={data.weight}
                    onChange={(e) => handleInputChange(e)}
                  />
                  kg
                </p>
                <p>
                  height:
                  <input
                  style={{backgroundColor: 'transparent', width: '30%'}}
                    type="number"
                    name="height"
                    value={data.height}
                    onChange={(e) => handleInputChange(e)}
                  />
                  ft
                </p>
              </div>
            </div>
            <div className={style.type}>
              <div className={style.types_container}>
                <h1>Types</h1>
                <div className={style.types}>
                  {options?.map((t) => (
                    <div key={t.slot} className={style.input_container}>
                      <input
                        type="checkbox"
                        name={t.name}
                        value={t.slot}
                        id={t.slot}
                        onChange={(e) => checkbox(e)}
                      />
                      <label htmlFor={t.slot}>{t.name}</label>
                      {t.slot % 4 === 0 ? <br /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={style.meter}>
              <div className={style.type}>
              <p>
                  life:
                <input
                  type="number"
                  name="life"
                  value={data.life}
                  onChange={(e) => handleInputChange(e)}
                />
                </p>
                <p>
                  strength:
                <input
                  type="number"
                  name="strength"
                  value={data.strength}
                  onChange={(e) => handleInputChange(e)}
                />
                </p>
              </div>
              <div className={style.type}>
              <p>
                  defense:
                <input
                  type="number"
                  name="defense"
                  value={data.defense}
                  onChange={(e) => handleInputChange(e)}
                />
                </p>
                <p>
                  speed:
                <input
                  type="number"
                  name="speed"
                  value={data.speed}
                  onChange={(e) => handleInputChange(e)}
                />
                </p>
              </div>

              <button onClick={() => setEdit(false)} className={style.buttons}>Cancel</button>
            <button onClick={(e) => saveChanges(e)} className={style.buttons}>Save</button>

             
            </div>
           
          </form>
          <Toast toastlist={list} position="buttom-right" setList={setList} />
        </>
      ) : (
        <>
          <div className={style.container}>
            <h1 className={style.container__h1}>
              #{pokemon.id} {pokemon.name}
            </h1>
            <div className={style.img}>
              <img
                src={
                  pokemon.img
                    ? pokemon.img
                    : "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"
                }
                alt="pokemon"
              />
              <div className={style.parrafo}>
                <p>peso: {pokemon.weight}kg</p>
                <p>altura: {pokemon.height}ft</p>
              </div>
            </div>

            <div className={style.type}>
              {pokemon.type
                ? pokemon?.type.map((t) => (
                    <h3 className={style[`${t}`]}>{t}</h3>
                  ))
                : null}
            </div>
            <div className={style.meter}>
              <div className={style.type}>
                <Stats valor={pokemon.life} nombre={"Life"} />
                <Stats valor={pokemon.strength} nombre={"Strength"} />
              </div>
              <div className={style.type}>
                <Stats valor={pokemon.defense} nombre={"Defense"} />
                <Stats valor={pokemon.speed} nombre={"Speed"} />
              </div>
            </div>
            <button onClick={() => editPokemon()} className={style.buttons}>Edit</button>
            <button onClick={() => deletePokemon()} className={style.buttons}>Delete</button>
          </div>
        </>
      )}
    </>
  );
};
