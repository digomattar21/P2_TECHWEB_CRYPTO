import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../firebase";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Api from '../../util/api.util'


function CryptoTable({query, setQuery}) {
  const [user, loading] = useAuthState(auth);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(null);
  const [allRows, setAllRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  useEffect(() => {
    getTickers();
  },[]);

  useEffect(()=>{
    let temp = allRows?.slice(0, rowsPerPage);
    setRows(temp);
  },[allRows])


  const getTickers = async () => {
    let url = `${process.env.REACT_APP_LUNARCRUSH_MARKET_ENDPOINT}data=market&key=${process.env.REACT_APP_LUNARCRUSH_KEY}&page=${page}&limit=100&sort=acr`;
    try {
      let req = await axios.get(url);
      console.log(req)
      setAllRows(req.data.data);
      let temp = allRows?.slice(0, rowsPerPage);
      setRows(temp);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWatchlistClick = async(symbol)=>{
    try {
      let req = await Api.handleAddToWatchlistClick({symbol: symbol, email: user.email})
      console.log(req)

    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRows(allRows.slice(0, parseInt(event.target.value)));
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableMainContainer>
      <TableeContainer>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="custom pagination table">
            <TableBody>
            <TableRow>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Symbol</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Price ($)</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>24h</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>1h</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Mkt Cap</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Tweets</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Social score</span>
            </TableCell>
            <TableCell component="th" scope="row">
                <span style={{fontWeight: 'bold'}}>Add watchlist</span>
            </TableCell>
            </TableRow>
              {rows &&
                !query &&
                rows.length > 0 &&
                rows.map((row) => {
                  return (
                    <TableRow key={row.n}>
                      <TableCell>{row.n} ({row.s})</TableCell>
                      <TableCell>{row.p}</TableCell>
                      <TableCell className={row.pc<0?"red": "green"}>{row.pc}%</TableCell>
                      <TableCell className={row.pch<0?"red":"green"}>{row.pch}%</TableCell>
                      <TableCell>{row.mc}</TableCell>
                      <TableCell>{row.t}</TableCell>
                      <TableCell>{row.ss}</TableCell>
                      <TableCell><Button type='button' style={{backgroundColor: '#929292', padding: ''}} 
                        onClick={()=>handleAddToWatchlistClick(row.s)}
                      >
                        <BookmarkBorderIcon style={{color: 'white'}}/>
                      </Button></TableCell>
                    </TableRow>
                  );
                })}
                {allRows &&
                query &&
                allRows.length > 0 &&
                allRows.map((row) => {
                  if ((row.n.toLowerCase().includes(query.toLowerCase()))||(row.s.toLowerCase().includes(query.toLowerCase()))){
                    return (
                    <TableRow key={row.n}>
                      <TableCell>{row.n} ({row.s})</TableCell>
                      <TableCell>{row.p}</TableCell>
                      <TableCell className={row.pc<0?"red": "green"}>{row.pc}%</TableCell>
                      <TableCell className={row.pch<0?"red":"green"}>{row.pch}%</TableCell>
                      <TableCell>{row.mc}</TableCell>
                      <TableCell>{row.t}</TableCell>
                      <TableCell>{row.ss}</TableCell>
                      <TableCell><Button type='button' style={{backgroundColor: '#929292', padding: ''}} 
                        onClick={()=>handleAddToWatchlistClick(row.n)}
                      >
                        <BookmarkBorderIcon style={{color: 'white'}}/>
                      </Button></TableCell>
                    </TableRow>
                  );
                  }
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {rows && rows.length > 0 && (
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </TableeContainer>
    </TableMainContainer>
  );
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
  .red{
    color: red
  }
  .green{
    color: green
  }
`;
