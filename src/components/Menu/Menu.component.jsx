import axios from 'axios';
import { useEffect, useState } from 'react';
import s from './style.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/').then((res) => setData(res.data));
	}, []);

	return (
		<div className={s.menu}>
			<div className={s.itemContainer}>
				{data.map((d) => (
					<Link key={d._id} to={d._id}>
						<div className={s.item}>
							<span>
								<img src={d.imageUrl} alt={d.name} />
							</span>
							<span className={s.name}>{d.name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
