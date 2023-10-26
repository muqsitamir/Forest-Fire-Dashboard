import React from "react";
//import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';
import {CardMedia} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import  Chip from "@mui/material/Chip";

export default function GridEvent(props){
    let content = props.content;
    
    return(
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': { 
              m: 4,
              width: 250,
              height: 310,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            },
          }}
        >
         <Paper elevation={4} sx={{overflow: 'auto'}} >
              
                <Typography variant="h6" gutterBottom component="div" marginTop={1} marginLeft={2}>
                    {content.description}
                </Typography>
                <div className='camera-info' >
                <Typography variant="h6" gutterBottom component="div" marginTop={1} marginLeft={2}>
                {content.camera_name}
                </Typography>
                    </div>
                <CardMedia
                component="img"
                height="80"
                width="80"
                image={content.thumbnail}
                alt="Camera Image"
                />
                <div>
               
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            Created:
                          </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.created_at}
                        </Typography>
                    </div>
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            Last Report:
                        </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.updated_at}
                        </Typography>
                    </div>
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            SMS Sent:
                        </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.sms_sent ? 'True' : 'False'}
                        </Typography>
                    </div>
                    <div className='camera-info' style={{marginTop: 5}} >
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Species:
                            </Typography>
                        </div>
                        {content.species.map((item) => (
                        <Chip className="mr1" style={{ backgroundColor: item.color }} color="primary" key={item.key} label={item.name} />
                      ))}
                      
                    </div>
                    
                </div>
          </Paper>
        </Box>
    );



}