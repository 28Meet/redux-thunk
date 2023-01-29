import React from 'react';
import { HEADCELLS } from '../constant/Constant';
import { visuallyHidden } from '@mui/utils';
import { TableHead, TableRow, TableCell, TableSortLabel, Box, Checkbox } from '@mui/material';

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort, onSelectAllClick } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <>
            <TableHead>
                <TableRow >
                    <TableCell>
                        <Checkbox
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {HEADCELLS.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={"center"}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            sx={{ fontSize: 16 }}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>
    )
}


export default EnhancedTableHead;