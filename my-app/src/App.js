import './App.css';
import Cards from './cards';
import MoveCard from './MoveCard';
import React from 'react';
import LetNewCard from './letNewCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			cardsObj: [] //Массив с объектами записей
		}

		this.handleChange = this.handleChange.bind(this)
	}

	// Функция передаёт стейту новый изменённый массив объектов
	handleChange(array) {
		this.setState({ cardsObj: array })
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Routes>
						{/* Основной блок. Передаётся основной массив */}
						<Route path='/' element={<Cards cardsArray={this.state.cardsObj}/>}>
							{/* модальное окно для добавление новой записи. Передаётся основной массив и функция для добавление изменённого массива*/}
							<Route path='new' element={<LetNewCard save={this.state.cardsObj} func={this.handleChange}/>} />
						</Route>
						{this.state.cardsObj.map((item, index) => {
							return (
								//Блок для изменение или удаление записи. Передаётся title, index и content выбранного элемента, основной массив, функция для добавление изменённого массива,
								<Route path={`card/${index}`} element={<MoveCard title={item.title} content={item.content} changeArray={this.state.cardsObj} func={this.handleChange} ind={index}/>} />
							)
						})}
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}
