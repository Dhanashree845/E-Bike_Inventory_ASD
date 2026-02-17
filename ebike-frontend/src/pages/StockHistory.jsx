import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function StockHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/stockhistory");
      setHistory(res.data.data || []);
    } catch (error) {
      console.error("Stock History Fetch Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Stock History
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {history.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.bikeId}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default StockHistory;
