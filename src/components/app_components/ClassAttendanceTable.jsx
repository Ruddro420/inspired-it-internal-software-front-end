import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Alert from './Alert';
import { useState } from 'react';
const ClassAttendanceTable = ({students, date}) => {
   const [data, setData] = useState([])

   let attendance = []
   const handleStatus =  (classId, sectionId, id_no) => {
      attendance.push({
        classId, 
        sectionId: sectionId ? sectionId : null, 
        date: new Date(date)
      })
   }

    return (
        <div> 
          {
            students.length == 0 ? <Alert title="No students is admitted to this class/(Section)!" subtitle="Add students to see." link="/dashboard/add-students" linktitle="Add"/> : <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>ID No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                 Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
              {students.map(student => 
                
                    <TableRow key={student.email}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={`http://localhost:5000/image/students/${student.id_no}`}
                          width="64"
                        />
                        {/* <ImageView imageUrl={`http://localhost:5000/image/students/${student.id_no}`} defaultImageUrl="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"/> */}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.id_no}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      {student.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      {student.phone}
                      </TableCell>
                      
                    </TableRow>
                
                
              )}
            </TableBody>
          </Table>
          }
             
        </div>
    );
};

ClassAttendanceTable.propTypes = {
    students: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
}

export default ClassAttendanceTable;