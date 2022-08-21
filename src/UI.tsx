import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Checkbox,
  Slider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { ModuleType } from "./utils/webgl";

export default function UI(props) {
  const {
    onCheckShowGrid,
    onChangeRes,
    res,
    onChangeSpacing,
    spacing,
    canvasRef,
  } = props;

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }
    const subpath = window.location.hash.split("/")[1];
    const Subpath = subpath.charAt(0).toUpperCase() + subpath.slice(1);
    const moduleType: ModuleType = ModuleType[Subpath];
    if (moduleType) {
      props.setModule(moduleType);
    }
  });

  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Accordion
        sx={{
          position: "fixed",
          right: 0,
          backgroundColor: "#111",
          color: "#eee",
          width: "15%",
        }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ margin: "auto" }}>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Checkbox
            sx={{ color: "white", display: "inline" }}
            onChange={onCheckShowGrid}
          ></Checkbox>
          <Typography sx={{ display: "inline" }}>show grid</Typography>

          <Slider
            sx={{ width: "50%" }}
            value={res}
            min={1}
            max={window.innerWidth * window.devicePixelRatio}
            step={1}
            onChange={(e: Event, v: number | number[]) =>
              onChangeRes(v as number)
            }
          />
          <Typography sx={{ display: "inline" }}> res: {res}</Typography>

          <Slider
            sx={{ width: "50%" }}
            value={spacing}
            min={1}
            max={50}
            step={1}
            onChange={(e: Event, v: number | number[]) =>
              onChangeSpacing(v as number)
            }
          />
          <Typography sx={{ display: "inline" }}> spacing</Typography>
        </AccordionDetails>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.module}
              label="Module"
              style={{ color: "white" }}
              onChange={(e) => {
                window.location.hash =
                  "#/" + ModuleType[e.target.value as ModuleType];
                props.setModule(e.target.value as ModuleType);
              }}
            >
              {(Object.keys(ModuleType) as Array<keyof typeof ModuleType>)
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <MenuItem key={key} value={ModuleType[key]}>
                    {key}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Accordion>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "grey",
          imageRendering: "pixelated",
        }}
      ></canvas>
    </div>
  );
}
