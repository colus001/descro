import React, { Fragment, Component } from 'react';
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

		return isShow && (
			<Fragment>
				<div className={wrapperClass ? `modal ${wrapperClass}` : "modal"}>
					{children}
				</div>
				<div className="modal-bg" onClick={this.hideModal} />
			</Fragment>
		)
	}
}

export default Modal;
