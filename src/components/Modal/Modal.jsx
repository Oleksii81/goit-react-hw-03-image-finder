import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBackdropStyle } from "./Modal.styled";
import { ReactComponent as CloseIcon } from "../../icon/close.svg";
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    static propTypes = {
      url: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
    };
  
    componentDidMount() {
      window.addEventListener('keydown', this.clickEsc);
    }
    componentWillUnmount() {
      window.removeEventListener('keydown', this.clickEsc);
    }
    
    handleCloseClick = () => {
        this.props.onClose();
    };

    clickBackdrop = event => {
      if (event.target === event.currentTarget) {
        this.props.onClose();
      }
    };
  
    clickEsc = event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    };

    render() {
        return createPortal(
            <ModalBackdropStyle onClick={this.clickBackdrop}>
                <div className="modal">
                    <button type="button" className="close-btn" onClick={this.handleCloseClick}>
                        <CloseIcon className="close-icon" width="40" height="40"/>
                    </button>
                    <img src={this.props.url} alt={this.props.tags} />
                    
                </div>
            </ModalBackdropStyle>,
            modalRoot
        )
    };
};

