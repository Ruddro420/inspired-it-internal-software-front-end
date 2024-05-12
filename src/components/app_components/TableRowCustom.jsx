
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import PropTypes from 'prop-types'

const TableRowCustom = ({teacher, handleDelete}) => {
    const { id_no, name, phone,  designation, department} = teacher
    return (
        <TableRow>                     
        <TableCell className="hidden sm:table-cell">
            <img
            alt="Teacher Image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={`http://localhost:5000/image/teachers/${id_no}`}
            width="64"
        />
        </TableCell>
        <TableCell className="font-medium">
           {name}
        </TableCell>
        <TableCell>
            {phone}
        </TableCell>
        {/* <TableCell className="hidden md:table-cell">
           {present_address}
        </TableCell> */}
        <TableCell className="hidden md:table-cell">
            {designation}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {department}
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
                    <DropdownMenuItem onClick={()=> handleDelete(id_no)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
       
    </TableRow>
    );
};

TableRowCustom.propTypes = {
    teacher: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default TableRowCustom;