import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../firebase';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

function CryptoTable() {
  const [user,loading] = useAuthState(auth);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  useEffect(()=>{
    getTickers();
  },[])

  const getTickers = async() => {
    let url = `${process.env.REACT_APP_LUNARCRUSH_MARKET_ENDPOINT}data=market&key=${process.env.REACT_APP_LUNARCRUSH_KEY}&page=${page}&limit=25&sort=acr`;
    try {
      let req = await axios.get(url);
      setRows(req.data.data)
      console.log(req.data)
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <TableMainContainer>
      <TableeContainer>
      <TableContainer component={Paper}>
      <Table className="table" aria-label="custom pagination table">
        <TableBody>
          {rows && rows.length>0 &&(
            rows.map((row)=>{
              console.log(row)
              return (
                <TableRow key={row.n}>
                  <TableCell component='th' scope='row'>
                    {row.s}
                  </TableCell>
                  <TableCell>
                    {row.p}
                  </TableCell>

                </TableRow>
              )
            })
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              // onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
      </TableeContainer>

    </TableMainContainer>

  )
}

export default CryptoTable;

const TableMainContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TableeContainer = styled.div`
  border: 1px solid blue;
  border-radius: 5px;
  width: 80%;
`;
