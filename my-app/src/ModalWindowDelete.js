import { Link } from 'react-router-dom'

const WindowDeleteOrNot = (props) => {

	function handleClickYes () {
		// при клике на кнопку "ДА" передаётся true в MoveCard с помощью функции переданной пропсом
		props.delete(true)
	}

	function handleClickNo () {
		// при клике на кнопку "НЕТ" передаётся false в MoveCard с помощью функции переданной пропсом
		props.delete(false)
	} 

	return (
		// получает через пропс значение true или false. 
		// true, если был клик на кнопку удаления, появдяется модальное окно
		// false, если не было клика на кнопку, модальное окно остаётся не активным
		<div style={props.clickDelete === true ? {opacity: 1} : {opacity: 0}} className="windowDelete">
			<h3 className="windowDelete_text">Действительно ли вы хотите удалить эту запись?</h3>
			<div className="windowDelete_btn_flex">
				<button onClick={handleClickNo} className="windowDelete_btn_no">Нет</button>
				<Link to='/'><button onClick={handleClickYes} className="windowDelete_btn_yes">Да</button></Link>
			</div>
		</div>
	)
}

export default WindowDeleteOrNot