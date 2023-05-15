import React from 'react'
import { v4 as uuidv4 } from 'uuid';
const CompFormulario = () => {
    //Estado - hooks
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("")
    const [nombreEditado, setnombreEditado] = React.useState("");
    const [apellidoEditado, setapellidoEditado] = React.useState("");
    const [editarId, setEditarId] = React.useState(null);
    const [lista, setLista] = React.useState([])
    //Guardar dato
    const guardarDatos = (e) => {
        e.preventDefault();
        if (!nombre) {
            alert("Por favor, ingrese su nombre")
            return
        }
        if (!apellido) {
            alert("Por favor, ingrese su apellido")
            return
        }
        //Agregar a la lista
        setLista([
            ...lista,
            { id: uuidv4(), nombre: nombre, apellido: apellido }
        ])
        //Limpiar inputs
        e.target.reset();
        //Limpiar los estados
        setApellido("")
        setNombre("")
    };
    //Eliminar dato
    const eliminarItem = (item) => {
        const nuevaLista = [...lista];
        nuevaLista.splice(item, 1);
        setLista(nuevaLista);
    };
    //Editar dato
    const editarItem = (id) => {
        const filaEditar = lista.find((item) => item.id === id);
        setEditarId(id);
        setnombreEditado(filaEditar.nombre);
        setapellidoEditado(filaEditar.apellido);
    };
    const actualizarItem = (e) => {
        e.preventDefault();
        if (!nombreEditado || !apellidoEditado) {
            alert("Faltan campos de edición");
            return;
        }
        const nuevaLista = lista.map((item) => {
            if (item.id === editarId) {
                return {
                    ...item,
                    nombre: nombreEditado,
                    apellido: apellidoEditado
                };
            }
            return item;
        });
        setLista(nuevaLista);
        cancelarEdicion();
    };
    const cancelarEdicion = () => {
        setEditarId(null);
        setnombreEditado("");
        setapellidoEditado("");
    };
    return (
        <div className="container d-flex justify-content-center p-3">
            <div className="col-md-6" style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)", padding: "30px" }}>
            <h2 className="text-black text-center mt-4">
                Formulario de Registro de Usuario
            </h2>
            <form onSubmit={guardarDatos}>
            <label htmlFor="nombreInput">Nombre</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Ej: Maria"
                    onChange={(e) => setNombre(e.target.value.trim())}
                />
                <label htmlFor="nombreInput">Apellido</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Ej: Lopez"
                    onChange={(e) => setApellido(e.target.value.trim())}
                />
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-outline-dark">
                        Registrar
                    </button>
                </div>
            </form>
            <hr />
            <h4 className=" mt-4">Listado</h4>
            <ol className='list-group'>
                {lista.map((item) => (<li className='list-group-item' key={item.id}>
                    {item.id === editarId ? 
                    (<form onSubmit={actualizarItem}>
                        <label htmlFor="nombreInput">Nombre</label>
                        <input type='text' 
                        className='form-control mb-3' 
                        placeholder='Por favor, ingrese su nombre'
                        value={nombreEditado} onChange={(e) => setnombreEditado(e.target.value.trim())} />
                        <label htmlFor="nombreInput">Apellido</label>
                        <input type='text' 
                        className='form-control mb-3' 
                        placeholder='Por favor, ingrese su  apellido' 
                        value={apellidoEditado} onChange={(e) => setapellidoEditado(e.target.value.trim())} />
                        <div className='d-grid gap-2'>
                            <button type='submit' 
                            className='btn btn-outline-success'>
                                Guardar
                            </button>
                            <button type='button' 
                            className='btn btn-outline-danger' 
                            onClick={cancelarEdicion}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                    ) : (
                        <div>
                            {item.nombre} {item.apellido}
                            <button
                                className='btn btn-outline-danger float-end'
                                onClick={() => eliminarItem(item)}
                            >
                                Eliminar
                            </button>
                            <button
                                className='btn btn-outline-success float-end me-2'
                                onClick={() => editarItem(item.id)}
                            >
                                Editar
                            </button>
                        </div>
                    )}
                </li>
                ))}
            </ol>
            </div>
            
        </div>
    );
};
export default CompFormulario;