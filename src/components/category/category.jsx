import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import s from '../Menu/style.module.css';

const Category = () => {
    let { category } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => setData(res.data))
    }, [])

    return (
        <div className={s.menu}>
            <div className={s.itemContainer}>
                {
                    data.filter(d => d.category === category).map(dd => (
                        <Link to={`${dd._id}`} key={dd._id}>
                            <div className={s.item}>
                                <span><img src={dd.imageUrl} alt={dd.name} />
                                </span>
                                <span className={s.name}>{dd.name}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Category;