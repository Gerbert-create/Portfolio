import React from 'react'
import './cards.css'
import { Link, Outlet } from 'react-router-dom'

//Основной блок.
export default class Cards extends React.Component {

	render() {
		return (
			<div className='cardsBlock'>
				<h1 className='title'>Блог</h1>
				<div className='cards_flex'>
					{/*render всех элементов массива */}
					{this.props.cardsArray.map((item, index) => {
						return (
							<div key={index} className='card'>
								<h2 className='cards_title'>{item.title}</h2>
								<div className='cards_content'>{item.content}</div>
								<Link className='cards_btn_link' to={`/card/${index}`}><button className='cards_btn'>перейти</button></Link>
							</div>
						)
					})}
				</div>
				<Link className='btn_add_link' to='new'><button className='btn_add'>+ Добавить</button></Link>

				{/* Модальное окно для добавление нового элемента */}
				<Outlet />
			</div>
		)
	}
}