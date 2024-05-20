/* eslint-disable react/prop-types */

import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TableRowCustom = ({ data, handleDelete, nameFile }) => {
  const { id_no, name, phone, designation, department } = data;

  // console.log(handleDelete);
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Teacher Image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`http://localhost:5000/image/${nameFile}/${id_no}`}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{id_no}</TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{phone}</TableCell>
      {/* <TableCell className="hidden md:table-cell">
           {present_address}
        </TableCell> */}
      <TableCell className="hidden md:table-cell">{designation}</TableCell>
      <TableCell className="hidden md:table-cell">{department}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/dashboard/${nameFile}-profile/${id_no}`}>
              {" "}
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(id_no)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

TableRowCustom.propTypes = {
  teacher: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableRowCustom;
