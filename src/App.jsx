import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal';

import './App.scss';

const App = () => {

    // utilizado para abrir o modal - inicia-se 'false' para não abrir a página com o modal aberto
    const [modalOpen, setModalOpen] = useState(false);

    // utilizado apenas para enviar o tipo de informação sendo realizada (deletar/editar) para o TEXTO do modal
    const [op, setOp] = useState();

    //utilizado para enviar o index da linha que está sendo editada ou exluída
    const [targetIndex, setTargetIndex] = useState();

    //utilizado para apontar a linha que está sendo alterada e eliminar erro de falta de key quando editando um item
    const [editId, setEditId] = useState(null);

    //inciando a 'base de dados' da lista - apenas amostragem/teste
    const [rows, setRows] = useState([]);

    //adicionando lista para uma localStorage - Leitura qndo lista vazia
    useEffect(() => {
        if (rows.length === 0) return;
        localStorage.setItem('rows', JSON.stringify(rows));
    }, [rows]);

    //adicionando tarefas para uma localStorage - leitura qndo lista contém informação
    useEffect(() => {
        const rows = JSON.parse(localStorage.getItem('rows'));
        setRows(rows || []);
    }, []);

    //adiciona nova tarefa
    const handleAdd = () => {
        let myInput = document.getElementById('newTask');
        if (myInput.value !== "") {
            setRows([...rows, { title: myInput.value, done: false }]);
            myInput.value = "";
        };
    };

    //deleta tarefa
    const handleDelete = (targetIndex) => {
        setRows(rows.filter((_, index) => index !== targetIndex));
        if (rows.length === 1) {
            localStorage.removeItem('rows');
        }
        setEditId(-1);
        // location.reload();
    };

    //realiza a alteração na tarefa
    const handleUpdate = (targetIndex, newValue) => {
        rows[targetIndex].title = newValue;
        localStorage.setItem('rows', JSON.stringify(rows));
        setEditId(-1);
    };


    const handleChecked = (targetIndex, done) => {
        rows[targetIndex].done = done;
        localStorage.setItem('rows', JSON.stringify(rows));
        setRows(rows);
    };

    // renderiza os componentes 
    return (
        <>
            {/* NAVBAR: header da aplicação */}
            <Navbar />
            <main className='main-content'>
                <h1 className='main-title'>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>

                {/* TABLE: tabela que foi utilizada para listagem das tarefas */}
                <Table rows={rows}
                    addRow={handleAdd}
                    openCloseModal={() => { setModalOpen(!modalOpen); }}
                    op={op}
                    setOp={setOp}
                    setTargetIndex={setTargetIndex}
                    editId={editId}
                    handleUpdate={handleUpdate}
                    handleChecked={handleChecked} />

                {/* renderiza o modal apenas quando a variavel modalOpen é true */}
                {modalOpen && (<Modal openCloseModal={() => { setModalOpen(!modalOpen); }}
                    op={op}
                    setOp={setOp}
                    handleDelete={handleDelete}
                    targetIndex={targetIndex}
                    item={rows[targetIndex]}
                    setEditId={setEditId}>
                </Modal>)}

            </main>
        </>
    );
};

export default App;

