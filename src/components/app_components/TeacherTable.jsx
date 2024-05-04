import PropTypes from 'prop-types'
import {Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import TableRowCustom from './TableRowCustom';
const TeacherTable = ({ teachers }) => {
    return (
        <div>
            <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Address
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Designation
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Department
                                            </TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                       {
                                        teachers.map(teacher=> <TableRowCustom key={teacher.id} teacher={teacher}/>)
                                       }
                                    </TableBody>
                                </Table>
        </div>
    );
};

TeacherTable.propTypes = {
    teachers: PropTypes.array.isRequired
}


export default TeacherTable;