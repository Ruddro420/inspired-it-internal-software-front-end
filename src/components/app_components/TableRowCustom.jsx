
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import PropTypes from 'prop-types'

const TableRowCustom = ({teacher}) => {
    const { image, name, phone, present_address, designation, department} = teacher
    return (
        <TableRow>
                                            
        <TableCell className="hidden sm:table-cell">
            {
                image ? <img
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
                width="64"
            /> : <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
            width="64"
        />
            }
        </TableCell>
        <TableCell className="font-medium">
           {name}
        </TableCell>
        <TableCell>
            {phone}
        </TableCell>
        <TableCell className="hidden md:table-cell">
           {present_address}
        </TableCell>
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
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
       
    </TableRow>
    );
};

TableRowCustom.propTypes = {
    teacher: PropTypes.object.isRequired
}

export default TableRowCustom;