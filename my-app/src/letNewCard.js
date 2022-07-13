import React from 'react'
import './letNewCard.css'
import { Link } from 'react-router-dom'

//модальное окно для добавление новой записи
export default class LetNewCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			array: this.props.save, //полученый массив от App
			title: '', //название записи
			content: '' //контент записи
		}

		this.HandleInputChange = this.HandleInputChange.bind(this)
		this.HandleTextareaChange = this.HandleTextareaChange.bind(this)
		this.HandleCancelClick = this.HandleCancelClick.bind(this)
		this.HandleSaveClick = this.HandleSaveClick.bind(this)
	}

	HandleInputChange(event) {
		//добавление названия в state при изменение в input
		this.setState({ title: event.target.value })
	}

	HandleTextareaChange(event) {
		//добавление контента в state при изменение в textarea
		this.setState({ content: event.target.value })
	}

	HandleCancelClick() {
		// удаление title, content при нажатие на отмену
		this.setState({ title: '', content: '' })
	}

	HandleSaveClick() {
		//создание нового объекта с новыми данными
		const saveObj = {
			title: this.state.title,
			content: this.state.content
		}
		//добавление объекта в массиве из пропса
		this.props.save.push(saveObj)
		//перекидывание нового массива из state в App через функцию переданная через пропс
		this.props.func(this.state.array)
	}

	render() {
		return (
			<div className='modalWindow'>
				<input className='modalWindow_input' placeholder='title' onChange={this.HandleInputChange} type='text' />
				<textarea className='modalWindow_textarea' placeholder='content' onChange={this.HandleTextareaChange}></textarea>
				<div className='modalWindow_btn_flex'>
					<Link to='/'><button onClick={this.HandleCancelClick} className='modalWindow_btn_cancel'>Отмена</button></Link>
					<Link to='/'><button onClick={this.HandleSaveClick} className='modalWindow_btn_save'>Сохранить</button></Link>
				</div>
			</div>
		)
	}
}