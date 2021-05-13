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
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function CryptoTable({query, setQuery}) {
  const [user, loading] = useAuthState(auth);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(null);
  const [allRows, setAllRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter,setFilter] = useState(0);

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
    let url = `${process.env.REACT_APP_LUNARCRUSH_MARKET_ENDPOINT}data=market&key=${process.env.REACT_APP_LUNARCRUSH_KEY}&page=${page}&limit=200`;
    try {
      let req = await axios.get(url);
      console.log(req)
      setAllRows(req.data.data);
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

  const handleChangeRowsPerPage = (event, rowsPerPageBefore) => {
    setRows(allRows?.slice(rowsPerPageBefore*page, (rowsPerPageBefore*page)+parseInt(event.target.value)))
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setRows(allRows?.slice(newPage*rowsPerPage, (newPage+1)*rowsPerPage))
    setPage(newPage);
  };

  const handleFilter = (filter) =>{
    setFilter(filter)
    switch(filter){
      case null:
        setRows(allRows?.slice(rowsPerPage*page, rowsPerPage*(page+1)))
        break
      case 1:
        setRows(rows.sort((a,b)=> a.n.localeCompare(b.n)))
        break;
      case 2:
        setRows(rows.sort((a,b)=>b.p-a.p))
        break
      case 3:
        setRows(rows.sort((a,b)=> b.pc-a.pc))
        break
      case 4:
        setRows(rows.sort((a,b)=> b.pch-a.pch))
        break
      case 5:
        setRows(rows.sort((a,b)=> b.mc-a.mc))
        break;
      case 6:
        setRows(rows.sort((a,b)=> b.t-a.t))
        break;
      case 7:
        setRows(rows.sort((a,b)=> b.ss-a.ss))
        break;
      default:
        break
    }
  }

  return (
    <TableMainContainer>
      <TableeContainer>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="custom pagination table">
            <TableBody>
            <TableRow className="tableRow">
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>Symbol</span>
                {filter!==1?<ExpandMoreIcon onClick={()=>handleFilter(1)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>Price ($)</span>
                {filter!==2?<ExpandMoreIcon onClick={()=>handleFilter(2)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>24h</span>
                {filter!==3?<ExpandMoreIcon onClick={()=>handleFilter(3)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>1h</span>
                {filter!==4?<ExpandMoreIcon onClick={()=>handleFilter(4)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>Mkt Cap</span>
                {filter!==5?<ExpandMoreIcon onClick={()=>handleFilter(5)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
            </TableCell>
            <TableCell component="th" scope="row">
               <div>
               <span style={{fontWeight: 'bold'}}>Tweets</span>
                {filter!==6?<ExpandMoreIcon onClick={()=>handleFilter(6)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
               </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <div>
                <span style={{fontWeight: 'bold'}}>Social score</span>
                {filter!==7?<ExpandMoreIcon onClick={()=>handleFilter(7)}/>:<ExpandLessIcon onClick={()=>handleFilter(null)}/>}
                </div>
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
                      <TableCell>{row.p>10?row.p.toFixed(2):row.p}</TableCell>
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
                    colSpan={12}
                    count={allRows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={(event)=>handleChangeRowsPerPage(event,rowsPerPage)}
                    ActionsComponent={TablePaginationActions}
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
  align-items: center;
  margin-bottom: 100px;
`;

const TableeContainer = styled.div`
  border: 1px solid blue;
  border-radius: 5px;
  width: 80%;

  .tableRow{
    >th{
      >div{
        display: flex;
        align-items: center;
      }
      .MuiSvgIcon-root{
        :hover{
          opacity: 0.7;
          cursor:pointer;
        }
      }
    }
  }


  .red{
    color: red
  }
  .green{
    color: green
  }
`;
