import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#fef1f6',
      100: '#fee5ef',
      200: '#ffcae1',
      300: '#ff9fc6',
      400: '#ff639f',
      500: '#FF4081',
      600: '#f01253',
      700: '#d1053b',
      800: '#ad0731',
      900: '#8f0c2d',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#FF4081',
          inverseColor: '#ffffff',
          hoverColor: '#ff639f',
          activeColor: '#f01253',
        },
      },
    },
  },
});

export default MyPreset;
