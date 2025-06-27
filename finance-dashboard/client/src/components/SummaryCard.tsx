import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  color?: string;
  prefix?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  color = "#2196f3",
  prefix = "",
}: Props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "20px",
        p: 2,
        boxShadow: isDark
          ? "0 4px 15px rgba(0,0,0,0.5)"
          : "0 4px 15px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Text Section */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                mb: 1,
                color: "inherit",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              color="inherit"
              sx={{ fontSize: "1.8rem" }}
            >
              <CountUp end={value} duration={1.4} separator="," prefix={prefix} />
            </Typography>
          </Box>

          {/* Icon Bubble */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: color + "22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
              fontSize: 28,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
