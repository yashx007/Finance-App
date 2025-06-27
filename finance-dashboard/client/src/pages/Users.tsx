
import { Box, Typography, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const users = [
  {
    id: 1,
    avatar: "https://thispersondoesnotexist.com/",
    name: "Alice Sharma",
    email: "alice@example.com",
    role: "Admin",
  },
  {
    id: 2,
    avatar: "https://thispersondoesnotexist.com/",
    name: "Bob Thomas",
    email: "bob@example.com",
    role: "Viewer",
  },
  {
    id: 3,
    avatar: "https://thispersondoesnotexist.com/",
    name: "Charlie D.",
    email: "charlie@example.com",
    role: "Editor",
  },
];

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    width: 80,
    renderCell: (params: any) => (
      <Avatar src={params.value} alt="avatar" />
    ),
    sortable: false,
    filterable: false,
  },
  { field: "name", headerName: "Name", width: 180 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "role", headerName: "Role", width: 120 },
];

const Users = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Users
      </Typography>

      <Box mt={3} sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
