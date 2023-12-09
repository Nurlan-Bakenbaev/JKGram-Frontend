import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ActionAreaCard({
  userId,
  description,
  name,
  picturePath,
}) {
  const navigate = useNavigate();
  const ShortenedText = ({ text, maxLength }) => (
    <span>
      {text.length > maxLength ? `${text.slice(0, maxLength)} ...` : text}
    </span>
  );
  return (
    <Card
      onClick={() => {
        navigate(`/profile/${userId}`);
      }}
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ height: "80px" }}
          component="img"
          image={`https://postgrammserver.onrender.com/assets/${picturePath}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "blue",
              fontWeight: "bold",
              fontSize: "12px",
              borderBottom: "2px solid lightblue",
            }}
            variant="p"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: "12px" }}
            variant="body2"
            color="text.secondary"
          >
            <ShortenedText text={description} maxLength={115} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
