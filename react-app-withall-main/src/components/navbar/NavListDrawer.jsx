import { Drafts, InboxOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function NavListDrawer() {
  return (
    <Box sx={{ width: 250, bgcolor: "lightsalmon" }}>
      <nav>
        <List>
          <ListItem>
            <ListItemIcon>
              <InboxOutlined />
            </ListItemIcon>
            <ListItemText primary="Inbox"></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText primary="Drafts"></ListItemText>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#trash">
              <ListItemText>Trash</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#trash">
              <ListItemText>Spam</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
