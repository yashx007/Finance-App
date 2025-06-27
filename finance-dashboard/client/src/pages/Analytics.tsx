
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 5000, expense: 3000 },
  { month: "Feb", revenue: 6000, expense: 3500 },
  { month: "Mar", revenue: 7000, expense: 4000 },
  { month: "Apr", revenue: 8000, expense: 5000 },
  { month: "May", revenue: 7500, expense: 4700 },
];

const Analytics = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Analytics
      </Typography>

      <Card sx={{ mt: 3, background: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Revenue vs Expense (Last 5 Months)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4caf50"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#f44336"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;
