import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom"
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CommentList from "./CommentList";



function BoardDetail() {
  let params = useParams();
  const bnum = parseInt(params.detail)
  let navigate = useNavigate();

  let loginId = '';
  const cookie = window.localStorage.getItem("user")
  if(cookie){
    loginId = JSON.parse(cookie).userid
  }
  console.log(loginId)

  const [inputData, setInputData] = useState({
    bidx:'',
    buserid:'',
    btitle:'',
    bcontent:'',
    bhit:'',
    blikeuser:''
  });

  const callApi = async() => {
    const response = await axios.get("http://localhost:3001/board")
    const datas = response.data.filter(obj => obj.bidx === bnum)
    setInputData(datas[0])
  }
  
  useEffect(() => {
    callApi();
  },[]);

  const {bidx, buserid, btitle, bcontent} = inputData
  
  
  const onClick = ()=>{
    navigate(`/board/update/${bnum}`,{state:
      {
        bidx: bidx,
        buserid:buserid,
        btitle:btitle,
        bcontent:bcontent
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault(); // submit 이벤트 발생시 refresh 방지
    axios.delete("http://localhost:3001/board",{
      params: {
        bidx: bnum
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
        console.log(error.response.data)
        alert(error.response.data.error)
    })

    navigate(-1);// 뒤로가기
    
  }
  const style= {border: "none", background: "transparent" , resize : "none"}

  return (
    <>
      <h1>글 상세보기</h1>
      <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
      <Table size="small"  aria-label="simple table">
        <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">작성자</TableCell>
              <TableCell><input name="buserid" value={inputData.buserid} style={style} readOnly/></TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">제목</TableCell>
              <TableCell><input name="btitle" value={inputData.btitle} style={style} readOnly/></TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">내용</TableCell>
              <TableCell><TextareaAutosize name="bcontent" value={inputData.bcontent} style={style} readOnly/></TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">조회수</TableCell>
              <TableCell><input name="bhit" value={inputData.bhit} style={style} readOnly/></TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">좋아요수</TableCell>
              <TableCell><input name="blikeuser" value={inputData.blikeuser} style={style} readOnly/></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        {
          inputData.buserid == loginId
          ? (
            <>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button  variant="contained" onClick={onClick} >글 수정하기</Button>
            </Box>
            <form onSubmit={onSubmit}>
            <input name="bidx" type='hidden' />
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
              <Button  variant="contained" type="submit">글 삭제하기</Button>
            </Box>
          </form>
          </>
          ) 
          : null
        }
       
        <CommentList bnum={bnum}/>
    </>
  )
}


export default BoardDetail;