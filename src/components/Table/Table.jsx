
import './table.scss';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import plusIcon from '../../assets/plus.svg';

// import Checkbox from '../Checkbox/Checkbox';

// PROPS ===============================================================================================================================

//rows: prop que veio do App.jsx - array as tarefas que será lida via map() e renderizada na tela
//addRow ('handleAdd' de App.jsx): utilizado para adicionar novas tasks [via 'ENTER' ou 'botão +']
//openCloseModal: função que fecha ou abre o modal
//setOp: utilizado para definir o texto que vai para o modal
//setTargetIndex: seta o index da linha sendo alterada ou deletada [ao clicar nos ícones editIcon ou deleteIcon]
// editId: utilizado para armazenar o index da linha sendo alterada - recebe um valor diferente de -1 qndo existe 1 item sendo alterado
// handleUpdate: função que irá, de fato, alterar a linha - vinculada ao botão 'Salvar'
//handleChecked: função que irá salvar no local storage o valor do checkbox

//======================================================================================================================================

const Table = ({ rows, addRow, openCloseModal, setOp, setTargetIndex, editId, handleUpdate, handleChecked }) => {

    // renderiza os campos da TABLE
    return (
        <div className='tasks'>
            <table id='taskList'>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody id='myTbody'>
                    {rows.map((row, index) => (
                        index === editId ?
                            <tr key={editId}>
                                <td>< input type="text" defaultValue={row.title} autoFocus className='titleField editable' id='newInput' onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        let newValue = rows[index].title = document.getElementById('newInput').value;
                                        handleUpdate(index, newValue);
                                    }
                                }} /></td>
                                <td><input type='checkbox' onClick={() => {
                                    row.done = !row.done;
                                    console.log(row);
                                }}></input></td>
                                <td><button className='editButton' onClick={() => {
                                    let newValue = rows[index].title = document.getElementById('newInput').value;
                                    handleUpdate(index, newValue);
                                }}>Salvar</button></td>
                            </tr>
                            :
                            <tr key={index}>
                                <td id='taskCol' className='titleField'> {row.title}</td>
                                {
                                    row.done === true ?
                                        <td className='form-check'><input type='checkbox' id='myCheckbox' defaultChecked className='doneField form-check-input' onClick={() => {
                                            row.done = !row.done;
                                            handleChecked(index, row.done);
                                        }}></input>
                                        </td>
                                        :
                                        <td className='form-check'><input type='checkbox' id='myCheckbox' className='doneField form-check-input' onClick={() => {
                                            row.done = !row.done;
                                            handleChecked(index, row.done);
                                        }}></input>
                                        </td>
                                }
                                <td>
                                    <span>
                                        <img src={editIcon} alt="Editar item" onClick={() => {
                                            setOp('editar');
                                            setTargetIndex(index);
                                            openCloseModal();
                                        }} />
                                        <img src={deleteIcon} alt="Deletar item" onClick={() => {
                                            setOp('deletar');
                                            setTargetIndex(index);
                                            openCloseModal();
                                        }} />
                                    </span>
                                </td>
                            </tr>
                    ))}

                    <tr>
                        <td>
                            <input id='newTask' type='text' placeholder='Nova Tarefa...' onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    addRow();
                            }}></input>
                        </td>
                        <td></td>
                        <td>
                            <img id="plusSign" src={plusIcon} alt="Editar item" onClick={addRow} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default Table;