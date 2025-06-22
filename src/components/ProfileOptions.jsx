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
                        <th className="table-number">#</th>
                        <th className="table-service">Servicio</th>
                        <th className="table-category">Categoria</th>
                        <th className="table-stars">Estrellas</th>
                        <th className="table-action" colSpan={2}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, key) => (
                            <tr key={service.id || key}>
                                <td className="table-number">{key + 1}</td>
                                <td className="table-service">{service.name || ""}</td>
                                <td className="table-category">{service.category || ''}</td>
                                <td className="table-stars"> <ReactStars
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