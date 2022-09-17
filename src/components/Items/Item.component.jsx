import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './style.module.css';

const Items = () => {

    let { id } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/${id}`)
            .then(res => setData(res.data))
    }, [])

    return (
        <div className={s.container}>
            <img src={data.imageUrl} alt={data.name} />
            <h1>{data.name}</h1>
            <p>{data.description}</p>
        </div>
    )
}

export default Items;