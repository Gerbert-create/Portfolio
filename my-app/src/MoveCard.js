import './moveCard.css'
import { Link } from 'react-router-dom'
import React from 'react'
import WindowDeleteOrNot from './ModalWindowDelete'

//Блок для изменение или удаление записи
export default class MoveCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			array: this.props.changeArray, //полученый массив от App
			title: '', //название записи
			content: '', //контент записи
			clickDelete: false, //прозрачность модального окна <WindowDeleteOrNot/>
		}

		this.HandleInputChange = this.HandleInputChange.bind(this)
		this.HandleTextareaChange = this.HandleTextareaChange.bind(this)
		this.HandleSaveClick = this.HandleSaveClick.bind(this)
		this.HandleDeleteClick = this.HandleDeleteClick.bind(this)
		this.HandleModalWindowClick = this.HandleModalWindowClick.bind(this)
	}

	HandleInputChange(event) {
		//добавление названия в state при изменение в input
		this.setState({ title: event.target.value })
	}

	HandleTextareaChange(event) {
		//добавление контента в state при изменение в textarea
		this.setState({ content: event.target.value })
	}

	//функция для сохранения изменённого объекта в основной массив 
	HandleSaveClick() {
		//index выбраного объекта получены через пропс
		const i = this.props.ind
		if (this.state.title !== '') {
			//измение title объекта при измение в input
			this.props.changeArray[i].title = this.state.title
		}
		if (this.state.content !== '') {
			//изменение content объекта при измение в textarea
			this.props.changeArray[i].content = this.state.content
		}
		//перекидывание нового массива из state в App через функцию переданная через пропс
		this.props.func(this.state.array)
	}

	//Функция для появление модального окна при нажатия на кнопку удаление
	HandleDeleteClick() {
		this.setState({ clickDelete: true })
	}

	//Функция принимает значение true или false от модального окна для удаление
	HandleModalWindowClick(value) {
		if (value === true) {
			//если true, удаляется объект из массива
			const i = this.props.ind
			this.props.changeArray.splice(i, 1)
		}
		if (value === false) {
			//если false, исчезает модальное окно для удаление
			this.setState({ clickDelete: false })
		}
	}

	render() {
		return (
			<>
				{/* если был клик на кнопку удаления, то блок блокируется от действия пользователя и появляется модальное окно. При нажатии на кнопку "НЕТ"
				в модальном окне, блок разблокировывается */}
				<div className='moveCardBlock' style={this.state.clickDelete === true ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}>
					<Link to='/'><button className='moveCardBlock_btn_back' >Назад</button></Link>
					<br />
					<label className='moveCardBlock_labelBlock'> Запись "{this.props.title}"
						<input onChange={this.HandleInputChange} className='moveCardBlock_input' defaultValue={this.props.title} type='text' />
						<textarea onChange={this.HandleTextareaChange} className='moveCardBlock_textarea' defaultValue={this.props.content} rows='30' cols='80'></textarea>
					</label>
					<div className='moveCardBlock_btn_flex'>
						<button onClick={this.HandleDeleteClick} className='moveCardBlock_btn_delete'>Удалить</button>
						<Link to='/'><button onClick={this.HandleSaveClick} className='moveCardBlock_btn_save'>Сохранить</button></Link>
					</div>



				</div>
				{/* модальное окно для удаление. Передаётся функция которая отвечает за удаление записи, получает значение true или false. Передаётся также значние opacity модального окна*/}
				<WindowDeleteOrNot delete={this.HandleModalWindowClick} clickDelete={this.state.clickDelete} />
			</>
		)
	}
}