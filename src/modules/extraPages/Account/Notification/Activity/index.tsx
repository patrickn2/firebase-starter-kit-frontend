import { Box, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react';
import { Activity } from '../../../../../@crema/services/db/extraPages/account';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import { Fonts } from '../../../../../shared/constants/AppEnums';

interface ActivityProps {
  activity: Activity[];
}

const ActivityView: React.FC<ActivityProps> = ({ activity }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id='extraPages.activity' />
      </Typography>

      {activity.map((data, index) => (
        <Box key={index} sx={{ mb: 1.5 }}>
          <FormControlLabel control={<Switch />} label={data.title} />
        </Box>
      ))}
    </Box>
  );
};

export default ActivityView;
