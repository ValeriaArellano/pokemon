import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../../redux/actions";
import Toast from "../toast/Toast";
import style from "./form.module.scss";

export const Form = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.types);

  const [list, setList] = useState([]);
  let toastProperties = null;
  const showToast = (type, description) => {
    switch(type) {
      case 'success':
        toastProperties = {
          id: list.length+1,
          title: 'Success',
          description: description,
          backgroundColor: '#5cb85c'
        }
        break;
      case 'danger':
        toastProperties = {
          id: list.length+1,
          title: 'Error',
          description: description,
          backgroundColor: '#d9534f'
        }
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  // const validate = (input) => {
  //   let errors = {};
  //   if (!input.name) {
  //     errors.name = "The name is required";
  //   }

  //   return errors;
  // };

  const [data, setData] = useState({
    name: "",
    life: '',
    strength: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
    img: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name !== "name" && e.target.name !== "img") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value) <= 0 ? 0 : Number(e.target.value),
      });
    } else {
      // setErrors(
      //   validate({
      //     ...data,
      //     [e.target.name]: e.target.value,
      //   })
      // );
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

  const submit = async (e) => {
    e.preventDefault();
    const crear = await fetch("https://pokemonnnnn.fly.dev/pokemons", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch(getPokemons());
    const respuesta = await crear.json();
    console.log(respuesta);
    setData({
      name: "",
      life: '',
      strength:'',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types: [],
      img: ""
    });

    if(respuesta.info === 'Pokemon created!'){
      showToast('success', respuesta.info)
    }else{
      showToast('danger', respuesta.info)
    }
  };

  return (
    <div className={style.container}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.form__inputs_container}>
          <h1>Create your own Pokemon</h1>
          <p className={errors.name ? style.danger : style.question}>
            <label>Pokemon name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </p>
          {errors.name ? <p className={style.danger}>{errors.username}</p> : null}
          <p className={style.question}>
            <label>Life</label>
            <input
              type="number"
              name="life"
              value={data.life}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Strength</label>
            <input
              type="number"
              name="strength"
              value={data.strength}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Defense</label>
            <input
              type="number"
              name="defense"
              value={data.defense}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Speed</label>
            <input
              type="number"
              name="speed"
              value={data.speed}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={data.height}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
            />
          </p>

          <p className={style.question}>
            <label>Image</label>
            <input
              type="text"
              name="img"
              value={data.img}
              onChange={handleInputChange}
            />
          </p>
        </div>

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
                  onChange={checkbox}
                />
                <label htmlFor={t.slot}>{t.name}</label>
                {t.slot % 4 === 0 ? <br /> : null}
              </div>
            ))}
            
          </div>
          <input type="submit" value="Create" className={style.submit} />
        </div>
      </form>

    <Toast toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
};