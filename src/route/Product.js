import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
}));

export default function Product(props) {
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
    }, []);

    return (
        <div>
          Product id: {id}
        </div>
    )
}
