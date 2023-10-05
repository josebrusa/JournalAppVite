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
import { satActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";

export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
    const dispatch = useDispatch();
    const onClickNote = () => {
        dispatch(satActiveNote({ title, body, date, imageUrls, id }));
    };
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + "..." : title;
    }, [title]);
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
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
    date: PropTypes.number.isRequired,
    imageUrls: PropTypes.string.isRequired,
};
