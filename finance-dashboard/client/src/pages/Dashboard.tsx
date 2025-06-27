

import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import SummaryCard from "../components/SummaryCard";
import { AttachMoney, MoneyOff, Balance, Group } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import "../styles/customInputs.css";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";


interface Transaction {
  _id: string;
  date: string;
  amount: number;
  category: "Revenue" | "Expense";
  status: string;
  user_id: string;
  user_profile: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    axios
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch error", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--input-bg", isDarkMode ? "#1e1e1e" : "#fff");
    document.documentElement.style.setProperty("--input-text", isDarkMode ? "#fff" : "#000");
    document.documentElement.style.setProperty("--input-border", isDarkMode ? "#444" : "#ccc");
    document.documentElement.style.setProperty("--input-placeholder", isDarkMode ? "#aaa" : "#666");
  }, [isDarkMode]);

  const filteredTransactions = transactions.filter((t) => {
    const matchCategory = categoryFilter === "All" || t.category === categoryFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchSearch =
      t.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  const groupByMonth = (data: Transaction[]) => {
    const grouped: Record<string, { revenue: number; expense: number }> = {};
    data.forEach((t) => {
      const date = new Date(t.date);
      const month = isNaN(date.getTime()) ? "Invalid" : date.toLocaleString("default", { month: "short", year: "numeric" });
      if (!grouped[month]) grouped[month] = { revenue: 0, expense: 0 };
      if (t.category === "Revenue") grouped[month].revenue += t.amount;
      if (t.category === "Expense") grouped[month].expense += t.amount;
    });
    return Object.entries(grouped).map(([month, values]) => ({ month, ...values }));
  };

  const totalRevenue = transactions.filter(t => t.category === "Revenue").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.category === "Expense").reduce((sum, t) => sum + t.amount, 0);
  const userCount = new Set(transactions.map(t => t.user_id)).size;

  const exportToCSV = () => {
    const csvHeader = ["ID", "Date", "Amount", "Category", "Status", "User ID", "User Profile"];
    const rows = filteredTransactions.map((t) => [
      t._id,
      new Date(t.date).toLocaleDateString(),
      t.amount,
      t.category,
      t.status,
      t.user_id,
      t.user_profile,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader, ...rows].map(row =>
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `transactions_${Date.now()}.csv`;
    link.click();
    setShowToast(true);
  };

  const columns: GridColDef[] = [
  {
    field: "user_profile",
    headerName: "User",
    width: 100,
    renderCell: ({ row }) => (
      <Box display="flex" alignItems="center">
        <img
          src={row.user_profile}
          alt="Avatar"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "user_id",
    headerName: "User ID",
    width: 120,
  },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    renderCell: ({ value }) => {
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return "—";
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch {
        return "—";
      }
    },
  },
  {
    field: "amount",
    headerName: "Amount (₹)",
    width: 140,
    renderCell: ({ row }) => (
      <Typography fontWeight={600} color={row.category === "Expense" ? "error" : "success.main"}>
        {row.category === "Expense" ? "-" : "+"} ₹{row.amount.toLocaleString()}
      </Typography>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        color={value === "Paid" ? "success" : "warning"}
        variant="outlined"
      />
    ),
  },
];


  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Box display="flex" flexWrap="wrap" gap={3} mb={4} justifyContent="space-between">
            <Box flex="1 1 200px"><SummaryCard title="Total Revenue" value={totalRevenue} prefix="₹" icon={<AttachMoney />} color="#4caf50" /></Box>
            <Box flex="1 1 200px"><SummaryCard title="Total Expenses" value={totalExpense} prefix="₹" icon={<MoneyOff />} color="#f44336" /></Box>
            <Box flex="1 1 200px"><SummaryCard title="Net Balance" value={totalRevenue - totalExpense} prefix="₹" icon={<Balance />} color="#2196f3" /></Box>
            <Box flex="1 1 120px"><SummaryCard title="Users" value={userCount} icon={<Group />} color="#9c27b0" /></Box>
          </Box>

          <Box
  display="flex"
  gap={2}
  mb={3}
  flexWrap="wrap"
  alignItems="flex-end"
>
  {/* Category Filter */}
  <FormControl sx={{ minWidth: 150 }} size="small">
    <InputLabel>Category</InputLabel>
    <Select
      value={categoryFilter}
      label="Category"
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Revenue">Revenue</MenuItem>
      <MenuItem value="Expense">Expense</MenuItem>
    </Select>
  </FormControl>

  {/* Status Filter */}
  <FormControl sx={{ minWidth: 150 }} size="small">
    <InputLabel>Status</InputLabel>
    <Select
      value={statusFilter}
      label="Status"
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Paid">Paid</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
    </Select>
  </FormControl>

  {/* Search Field */}
  <TextField
    label="Search"
    variant="outlined"
    size="small"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by user, category, status..."
    sx={{ minWidth: 220, flex: 1 }}
  />

  {/* Export Button */}
  <Button
    variant="contained"
    color="primary"
    onClick={exportToCSV}
    sx={{ height: 40 }}
  >
    Export CSV
  </Button>
</Box>


          {/* Chart & Recent Transactions */}
          <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }} mb={4}>
            <Box flex={2}>
              <Card sx={{ background: theme.palette.background.paper }}>
                <CardContent>
                  <Typography variant="h6" mb={2}>Overview</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={groupByMonth(filteredTransactions)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} />
                      <Line type="monotone" dataKey="expense" stroke="#fdd835" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
            <Box flex={1}>
              <Card sx={{ background: theme.palette.background.paper }}>
                <CardContent>
                  <Typography variant="h6" mb={2}>Recent Transactions</Typography>
                  <Box display="flex" flexDirection="column" gap={2} sx={{ maxHeight: 300, overflowY: "auto" }}>
                    {filteredTransactions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map(tx => (
                      <Box key={tx._id} display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ borderRadius: 2, background: isDarkMode ? "#2a2d3a" : "#f9f9f9" }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <img src={tx.user_profile} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                          <Box>
                            <Typography fontWeight={600}>{tx.user_id}</Typography>
                            <Typography variant="body2" color="text.secondary">{new Date(tx.date).toLocaleDateString()}</Typography>
                          </Box>
                        </Box>
                        <Box textAlign="right">
                          <Typography fontWeight={700} color={tx.category === "Expense" ? "error" : "success.main"}>
                            {tx.category === "Expense" ? "-" : "+"} ₹{tx.amount.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">{tx.status}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Data Table */}
          <Box>
            <Typography variant="h6" mb={2}>All Transactions</Typography>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={filteredTransactions}
                columns={columns}
                getRowId={(row) => row._id}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: isDarkMode ? "#232734" : "#f1f1f1",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: isDarkMode ? "#232734" : "#f1f1f1",
                    borderTop: "1px solid",
                    borderColor: theme.palette.divider,
                  },
                }}
              />
            </Box>
          </Box>
        </>
      )}

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setShowToast(false)}>
          CSV Exported Successfully ✅
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
