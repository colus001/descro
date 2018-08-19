import React, { Fragment, Component } from 'react'
import classNames from 'classnames'

import './Modal.css'

class Modal extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.isShow && nextProps.isShow !== this.props.isShow) {
			// body에 클래스 추가 modal-open
		}
	}

	showModal = () => {
		this.props.showModal && this.props.showModal()
	}

	hideModal = () => {
		this.props.hideModal && this.props.hideModal()
	}

	render() {
		const { children, isShow, className, showBtns, cancelFunc, confirmFunc } = this.props

		return isShow && (
			<Fragment>
				<div className={classNames('Modal', className)}>
          {children}
          {showBtns && <div>
            <button className="button button-outline" onClick={cancelFunc || this.hideModal || null}>Cancel</button>
            <button className="button" onClick={confirmFunc && confirmFunc}>Confirm</button>
          </div>}
				</div>
				<div className="Modal-bg" onClick={this.hideModal} />
			</Fragment>
		)
	}
}

export default Modal
