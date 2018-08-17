import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.isShow && nextProps.isShow !== this.props.isShow) {
			// body에 클래스 추가 modal-open
		}
	}

	showModal = () => {
		this.props.showModal && this.props.showModal();
	}

	hideModal = () => {
		this.props.hideModal && this.props.hideModal();
	}

	render() {
		const { children, isShow, wrapperClass } = this.props;

		return (
			isShow ? [
				<div key='modal' className={wrapperClass ? `modal ${wrapperClass}` : "modal"}>
					{children}
				</div>,
				<div key='modal-bg' className="modal-bg" onClick={this.hideModal} />
			] : ''
		);
	}
}

export default Modal;
