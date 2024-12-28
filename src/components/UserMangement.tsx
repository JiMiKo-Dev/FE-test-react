import { Pagination, Table } from 'react-bootstrap'
import usePagination from '../hooks/usePagination';
import NavbarMenu from './NavbarMenu';

function UserMangement() {
    const limitItems = 5;
    const { data, loading, currentPage, totalPages, goToPage } = usePagination('https://jsonplaceholder.typicode.com/posts', limitItems);

    return (
        <>
            <NavbarMenu />
            <div className="container-fluid">
                <h3 className="text-center my-4">Member List</h3>
                {loading && <p>Loading...</p>}


                <div className="row">
                    <div className="col-12">
                        <Table responsive className="text-center">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Decription</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((member, index) => (
                                        <tr key={index}>
                                            <td>{member.id}</td>
                                            <td>{member.title}</td>
                                            <td>{member.body}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>No Member</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Pagination className="d-flex justify-content-center">
                            <Pagination.First onClick={() => goToPage(1)} />
                            <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={currentPage === index + 1}
                                    onClick={() => goToPage(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => goToPage(totalPages)} />
                        </Pagination>

                    </div>
                </div>


            </div>
        </>
    );


}

export default UserMangement