import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { ApiRoutes } from '../enums/apiRoutes';
import { apiClient, getToken } from '../helpers/common';
import { useNavigate, useParams } from 'react-router-dom';

interface OperationsResponse {
  data: Operations;
}

interface Operations {
  fetch: string;
  delete: string;
  update: string;
  post: string;
}

const TableBox: React.FC = () => {
  const { actionId } = useParams();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const [tableData, setTableData] = useState<any[]>([]);
  const [flag, setFlag] = useState(false);
  const [api, setApi] = useState<Operations>({
    fetch: "",
    delete: "",
    update: "",
    post: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getToken();
        if (!accessToken) {
          console.log("No access token");
          return;
        }

        const actionsData = await apiClient.get<OperationsResponse>(`${ApiRoutes.ACTION_OPERATIONS}?actionId=${actionId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const operationsInfo = actionsData.data?.data;
        if(!operationsInfo){
          alert(`operation Master not created for this action`);
          navigate('/dashboard')
          return
        }
        setApi(operationsInfo);
        getData(operationsInfo.fetch, accessToken);
      } catch (err: any) {
        alert(`something went wrong: ${err.message}`);
        navigate('/dashboard')
      }
    };

    fetchData();
  }, [actionId, flag]);

  const getData = async (apiName: string, accessToken: string) => {
    try {
      const response = await apiClient.get(apiName, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response)
      setTableData(response.data.data.content || []);
    } catch (error: any) {
      alert(`Something went wrong: ${error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    const accessToken = getToken();
    if (!accessToken) {
      return;
    }

    try {
      await apiClient.delete(`${api.delete}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFlag((prev) => !prev);
    } catch (err: any) {
      alert(`Unauthorized user: ${err.message}`);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "25px" }}>
      <Table aria-label="dynamic table">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((column) => (
                <TableCell key={column}>
                  <Typography variant="h6" style={{ color: theme.palette.common.white }}>
                    {column.toUpperCase()}
                  </Typography>
                </TableCell>
              ))}
            <TableCell>
              <Typography variant="h6" style={{ color: theme.palette.common.white }}>
                ACTIONS
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              {Object.keys(row).map((column) => (
                <TableCell key={`${row.id}-${column}`}>
                  {String(row[column])}
                </TableCell>
              ))}
              <TableCell>
                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBox;
