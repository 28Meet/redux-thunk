import { useState, useEffect } from 'react';
import { Container, TextField, Table, Tooltip, TableBody, TableRow, TableHead, TableCell, TableContainer, Paper, Stack, IconButton, Checkbox, TableSortLabel, InputAdornment } from "@mui/material";
import DeleteModal from '../Delete-Modal/DeleteModal';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUsers, deleteUser, searchUser } from '../features/userSlice';
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import { HEADCELLS } from '../constant/Constant';

const DataTable = (props) => {
  let { setId, rows, openModal } = props;
  const dispatch = useDispatch();
  let loading = useSelector(state => state.user.loading);

  
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [selectAll, setSelectAll] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [loader, setLoader] = useState(false);

  const indexOfFirstRecord = (parseInt(currentPage) - 1) * parseInt(recordsPerPage);
  const indexOfLastRecord = parseInt(indexOfFirstRecord) + parseInt(recordsPerPage);

  const open = () => { setModal(true) }
  const close = () => { setModal(false) }

  const editData = () => {
    setSelected([]);
    setId(selected[0]);
  }

  const deleteData = () => {
    close()
    selected.map(id => dispatch(deleteUser(id)));
    dispatch(fetchUsers());
    setSelected([]);
    openModal("Data Deleted Successfull", "error");
  }


  const handleSorting = (name) => {
    let data = rows;
    setOrderBy(name);
    let comparator = 0;
    let ans = new Array();

    if (orderBy !== "id") {
      ans = [...data].sort((a, b) => {
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          comparator = 1;
        } else if (a[name].toLowerCase() < b[name].toLowerCase()) {
          comparator = -1;
        } else {
          comparator = 0;
        }
        return comparator;
      })
      // console.log(ans);
    } else {
      ans = [...data].sort((a, b) => {
        if (a[name] > b[name]) {
          comparator = 1;
        } else if (a[name] < b[name]) {
          comparator = -1;
        } else {
          comparator = 0;
        }
        return comparator;
      })
      // console.log(ans);
    }

    if (order === 'desc') {
      rows = ans.reverse();
      setOrder('asc');
    } else {
      rows = ans;
      setOrder('desc');
    }
    setRecords(rows);
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // call when we click on select all checkbox
  const handleSelectAllClick = (event) => {
    const { checked } = event.target;
    setSelectAll(checked)
    if (checked) {
      records.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(user => {
        selected.push(user.id);
      })
    } else {
      setSelected([])
    }
  }

  const handleSelectClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const headCellStyle = {
    display: "inline",
    fontWeight: "bold",
    fontSize: "14px"
  }

  const tableStyle = {
    height: 100,
    overflowY: "scroll"
  }

  useEffect(() => {
    setRecords(rows);
  }, [rows, modal]);

  useEffect(() => { setLoader(loading) }, [loading])

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(searchUser(searchString))
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchString])

  if (loader) {
    return (
      <CircularProgress />
    )
  } else {
    return (
      <>
        <Paper>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
              {selected?.length !== 0 && (
                <>
                  {
                    selected.length == 1 && (
                      <>
                        <Tooltip>
                          <IconButton onClick={editData}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )
                  }
                  <Tooltip>
                    <IconButton onClick={open}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "50%" }}>
                <TextField
                  value={searchString}
                  variant="outlined"
                  name="searchText"
                  size="small"
                  label="Search"
                  onChange={(e) => setSearchString(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        {
                          (searchString !== "" && <>
                            <Tooltip title="Cancel">
                              <IconButton onClick={() => { setSearchString(""); dispatch(fetchUsers()) }}>
                                <CloseIcon sx={{ cursor: "pointer" }} />
                              </IconButton>
                            </Tooltip>
                          </>)
                        }
                      </InputAdornment>
                    )
                  }}
                />
              </Container>
            </Stack>
            {
              (records.length !== 0) ? (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox checked={selectAll} onChange={handleSelectAllClick} />
                      </TableCell>
                      {
                        HEADCELLS?.map(head => (

                          <TableCell key={head.id}>
                            <TableSortLabel
                              active={orderBy === head.id}
                              direction={orderBy === head.id ? order : 'asc'}
                              onClick={() => handleSorting(head.id)}
                            >
                              {head.label}
                            </TableSortLabel>
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      records.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(user => {
                        const isItemSelected = isSelected(user.id);
                        return (
                          <TableRow key={user.id} sx={{ maxHeight: "200px" }} onClick={(event) => handleSelectClick(event, user.id)}>
                            <TableCell>
                              <Checkbox checked={isItemSelected} />
                            </TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>{user.mail}</TableCell>
                            <TableCell>{user.mobile}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.city}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              ) : (
                <h2>No Data Found</h2>
              )
            }
          </TableContainer >
          <Pagination
            count={rows.length}
            rowsPerPage={recordsPerPage}
            page={currentPage}
            setPage={setCurrentPage}
            setRowsPerPage={setRecordsPerPage}
          />


        </Paper >
        {
          (modal && <DeleteModal open={modal} close={close} deleteData={deleteData} content={selected} />)
        }
      </>
    )
  }
}

export default DataTable;