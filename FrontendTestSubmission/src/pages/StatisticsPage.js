import React from "react";
import { Box, Typography } from "@mui/material";
import { getShortUrls } from "../services/urlService";

export default function StatisticsPage() {
  const urls = getShortUrls();
  return (
    <Box p={4}>
      <Typography variant="h4">URL Statistics</Typography>
      {urls.map(u=>(
        <Box key={u.id} mt={3} p={2} border="1px solid #ccc">
          <Typography><a href={`/${u.shortCode}`}>{window.location.origin}/{u.shortCode}</a></Typography>
          <Typography>Created: {new Date(u.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(u.expiresAt).toLocaleString()}</Typography>
          <Typography>Clicks: {u.clickCount}</Typography>
          <ul>
            {u.clicks.map((c,i)=>(
              <li key={i}>{new Date(c.time).toLocaleString()} – {c.referrer||"direct"} – {c.location}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}
