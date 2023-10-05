import { TurnedInNot } from "@mui/icons-material";
import PropTypes from "prop-types";

import {
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useMemo } from "react";

export const SideBarItem = ({ title = "", body, id }) => {
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + "..." : title;
    }, [title]);
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};

SideBarItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
