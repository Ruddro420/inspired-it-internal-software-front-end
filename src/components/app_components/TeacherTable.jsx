import PropTypes from 'prop-types'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
const TeacherTable = ({ data }) => {
    return (
        <div>
            <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Id</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Address
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Class
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {
                            data.map(t=><TableRow key={t.teacher.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {t.teacher.name}
                            </TableCell>
                            <TableCell>{t.teacher.id}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {t.teacher.present_address}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {t.teacher.department}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>)
                          }
                        </TableBody>
                      </Table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired
}


export default TeacherTable;