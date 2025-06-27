
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />
          }
          label="Email Notifications"
        />

        <FormControlLabel
          control={
            <Switch
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
            />
          }
          label="SMS Notifications"
        />
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Your profile settings are managed from your account.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;
