import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createShortUrls } from "../services/urlService";
import { logEvent } from "../logger";


export default function ShortenerPage() {
  const [forms, setForms] = useState([{ longUrl: "", validity: "", customCode: "" }]);
  const [results, setResults] = useState([]);

  const updateForm = (i, field, v) => {
    const f = [...forms]; f[i][field] = v; setForms(f);
  };

  const addForm = () => forms.length < 5 && setForms([...forms, { longUrl: "", validity: "", customCode: "" }]);

  const handleSubmit = () => {
    const inputs = forms.map(f => ({ longUrl: f.longUrl, validity: parseInt(f.validity)||30, customCode: f.customCode }));
    const ids = inputs.every(i => i.longUrl.startsWith("http")) ? createShortUrls(inputs) : [];
    if (!ids.length) {
      logEvent("frontend","error","page","Invalid URL entered");
      return;
    }
    logEvent("frontend","info","page","Short URLs created");
    setResults(ids);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      {forms.map((f,i)=>(
        <Box key={i} mt={2} display="flex" gap={1}>
          <TextField fullWidth label="Long URL" onChange={e=>updateForm(i,"longUrl",e.target.value)} />
          <TextField label="Valid (min)" type="number" onChange={e=>updateForm(i,"validity",e.target.value)} />
          <TextField label="Custom Code" onChange={e=>updateForm(i,"customCode",e.target.value)} />
        </Box>
      ))}
      <Box mt={2}>
        <Button variant="outlined" onClick={addForm}>+ Add</Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ ml:2 }}>Shorten</Button>
      </Box>
      <Box mt={4}>
        {results.map(r=>(
          <Typography key={r.id}>
            <a href={`/${r.shortCode}`}>{window.location.origin}/{r.shortCode}</a> (Expires: {new Date(r.expiresAt).toLocaleString()})
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
