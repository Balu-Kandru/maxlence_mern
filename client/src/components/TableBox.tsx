import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { ApiRoutes } from '../enums/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../helpers/axiosClient';
import NoData from './NoData';


interface OperationsResponse {
  data: Operations
}
interface Operations {
  fetch: string;
  delete: string;
  update: string;
  post: string;
}
interface TableRowData {
  id: number;
  [key: string]: any;
}

interface TableApiResponse {
  data: {
    total: number;
    page: number;
    totalPages: number;
    content: TableRowData[];
  };
}

const TableBox: React.FC = () => {
  const { actionId } = useParams<{ actionId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();

  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [api, setApi] = useState<Operations>({
    fetch: "",
    delete: "",
    update: "",
    post: ""
  });

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const currActionApiRes = await apiClient.get<OperationsResponse>(`${ApiRoutes.ACTION_OPERATIONS}?actionId=${actionId}`);
        const operationsInfo = currActionApiRes.data?.data;
        if (!operationsInfo) {
          alert('Operation Master not created for this action');
          return navigate('/dashboard');
        }

        setApi(operationsInfo);
        fetchTableData(operationsInfo.fetch);
      } catch (error: any) { }
    };
    fetchOperations();
  }, [actionId, flag]);

  useEffect(() => {
    if (api.fetch) {
      fetchTableData(api.fetch, currentPage);
    }
  }, [currentPage]);

  const fetchTableData = async (apiName: string, page = 0, limit = 20) => {
    try {
      const response = await apiClient.get<TableApiResponse>(`${apiName}?page=${page}&limit=${limit}`);
      const { content, totalPages, page: currentPage } = response.data.data;
      if (!content.length) {
        setTableData([]);
        setTotalPages(1);
      } else {
        setTableData(content);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      }
    } catch (error: any) {
      console.error('Error fetching table data:', error.message);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`${api.delete}?id=${id}`);
      setFlag(prev => !prev);
    } catch (error: any) {
      console.error('Error deleting record:', error.message);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 25 }}>
      {tableData.length === 0 ? (
        <NoData />
      ) : (
        <>
          <Table aria-label="dynamic table">
            <TableHead>
              <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                {tableData.length > 0 &&
                  Object.keys(tableData[0]).map(column => (
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
              {tableData.map(row => (
                <TableRow key={row.id}>
                  {Object.keys(row).map(column => (
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
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            color="primary"
            style={{ margin: '20px 0', justifyContent: 'center', display: 'flex' }}
          />
        </>
      )}
    </TableContainer>
  );
};

export default TableBox;
