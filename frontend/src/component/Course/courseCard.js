import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Link } from "react-router-dom";
import "./courseCard.css";

export default function CourseCard({ course }) {
  //   const theme = useTheme();

  return (
    <Card className="card" sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link to={`/course/${course._id}`}>
            <Typography component="div" variant="h5">
              {course.name}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {course.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
