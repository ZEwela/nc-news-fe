import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";


const DrawerDisplay = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [topics, setTopics] = useState([])

    const {user} = useContext(UserContext)

    const drawerWidth = 240;

    useEffect(()=> {
      getTopics().then(topicsfromApi => {
        setTopics(topicsfromApi)
      })
    }, [])

    const loggedInActions = [{name: 'My profile', link:""}, {name: 'My articles', link:""}, {name: 'Add article', link:""}]
    const basicActions = [{name: 'All articles', link:"/articles"}]

    const formattedLinks = (link) => link.replace(/ /g, '-');

  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };

  


    const drawer = (
        <>
            <Toolbar />
            <Divider />
            <List>
              { basicActions.map((action) => (
                <Link key={action.name} to={action.link} >
                  <ListItem  disablePadding>
                    <ListItemButton onClick={handleDrawerClose}>
                        <ListItemText primary={action.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            { topics.length > 0 && (
            <>
              <List>
                <ListSubheader>Topics</ListSubheader> 
                {topics.map((topic) => (
                  <Link  key={topic.slug} to={`/topics/${topic.slug}`}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleDrawerClose}>
                        <ListItemText primary={topic.slug} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
            </>)}
            { user.username && <>
              <List>
                { loggedInActions.map((action) => (
                  <Link  key={action.name} to={formattedLinks(action.name)}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleDrawerClose}>
                        <ListItemText primary={action.name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>                  
                ))}
              </List>
              <Divider />
            </>}
        </>
    )

    return (
        <Box className="drawer-display">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            > 
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onTransitionEnd={handleDrawerTransitionEnd}
                  onClose={handleDrawerClose}
                  ModalProps={{
                    keepMounted: true, 
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
                <Drawer
                  variant="permanent"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                  open
                >
                  {drawer}
                </Drawer>
            </Box>
        </Box> )
    
}

export default DrawerDisplay