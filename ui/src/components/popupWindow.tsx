import * as React from 'react'
import { FC } from 'react'
import Modal, { Styles } from 'react-modal'

type PopupWindowProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  modalClassName?: string
  styles?: Styles
}

export const PopupWindow: FC<PopupWindowProps> = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    contentLabel={props.title}
    className={props.modalClassName}
    style={props.styles}
  >
    {props.children}
  </Modal>
)
