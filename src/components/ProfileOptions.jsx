import React from 'react'
import { Table } from 'react-bootstrap'
import { PencilFill, Trash2Fill, BookmarkCheckFill } from 'react-bootstrap-icons'
import ReactStars from 'react-stars'

const ProfileOptions = ({ services, action, nameAction }) => {
    return (
        <div>
            <h1>{nameAction}</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Servicio</th>
                        <th>Categoria</th>
                        <th>Estrellas</th>
                        <th colSpan={2}>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, key) => (
                        <>
                            <tr>
                                <td>{key + 1}</td>
                                <td>{service.name || ""}</td>
                                <td>{service.category || ''}</td>
                                <td> <ReactStars
                                    count={5}
                                    value={service.stars}
                                    size={12}
                                    color2={'#ffd700'} edit={false} />
                                </td>
                                {nameAction == 'servicios' ?
                                    <>
                                        <td>       
                                            <PencilFill onClick={()=>action.formUpdate(service)} />
                                        </td>
                                        <td>
                                            <Trash2Fill onClick={()=>action.deleteService(service.id)} />
                                        </td>
                                    </>
                                    :
                                    <td colSpan={2}>
                                        <BookmarkCheckFill onClick={()=>action.unFavorite(service.id)} />
                                    </td>
                                }
                            </tr>
                        </>

                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileOptions