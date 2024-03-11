import React from 'react';
import './modal.scss';


// PROPS ===================================================================================================================

//openCloseModal: função que fecha ou abre o modal - utilizada ao clicar no botão 'Não' do Modal
//op: variável que recebe o valor 'deletar' ou 'alterar' - usada na mensagem do modal e para direcionar ação do botão 'Sim'(btn-yes)
//handleDelete: função que deleta o item da lista ao clicar no botão 'sim' [apenas para deleção]
//targetIndex: utilizado para trazer o título/descrição do item sendo deletado para o modal
//item: linha da tabela de tasks que está sendo alterada, utilizada para trazer a descrição do item selecionado para o modal
//setEditId: utilizado para setar o index do item a ser editado

//==========================================================================================================================

const Modal = ({ openCloseModal, op, handleDelete, targetIndex, item, setEditId }) => {

    return (
        <div className='modal-container'
            onClick={(e) => {
                if (e.target.className === 'modal-container') {
                    closeModal();
                }
            }}>
            <div className='modal'>
                <h1 className='modal__title'>Deseja {op} esse item?</h1>
                <p className='modal__description'>{item.title}</p>
                <span className='action'>
                    <button className='action__btn-no' onClick={openCloseModal}>Não</button>
                    <button className='action__btn-yes' onClick={() => {
                        if (op === 'deletar') {
                            handleDelete(targetIndex);
                            setEditId(-1);
                        }

                        else {
                            setEditId(targetIndex);
                        }
                        openCloseModal();
                    }}>Sim</button>
                </span>
            </div>
        </div >
    );

};
export default Modal;