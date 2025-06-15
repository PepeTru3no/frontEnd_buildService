import React from 'react'
import { Table } from 'react-bootstrap'
import { PencilFill, Trash2Fill, BookmarkCheckFill } from 'react-bootstrap-icons'
import ReactStars from 'react-stars'
import '../styles/ProfileOptions.css'

const ProfileOptions = ({ services, action, nameAction }) => {
    return (
        <div className="profile-table-container">
            <h1 className="profile-table-title">{nameAction}</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Servicio</th>
                        <th>Categoria</th>
                        <th>Estrellas</th>
                        <th colSpan={2}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, key) => (
                            <tr key={service.id || key}>
                                <td>{key + 1}</td>
                                <td>{service.name || ""}</td>
                                <td>{service.category || ''}</td>
                                <td className="profile-table-icon"> <ReactStars
                                    count={5}
                                    value={service.stars}
                                    size={14}
                                    color2={'#ffd700'} edit={false} />
                                </td>
                                {nameAction == 'Servicios' ?
                                    <>
                                        <td>       
                                            <PencilFill title="Editar" onClick={()=>action.formUpdate(service)} />
                                        </td>
                                        <td>
                                            <Trash2Fill title="Borrar" onClick={()=>action.deleteService(service.id)} />
                                        </td>
                                    </>
                                    :
                                    <td colSpan={2}>
                                        <BookmarkCheckFill title="Favorito" onClick={()=>action.unFavorite(service.id)} />
                                    </td>
                                }
                            </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileOptions