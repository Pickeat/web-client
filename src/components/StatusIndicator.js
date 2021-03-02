import React, {useEffect, useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles(theme => ({
    main: {
    },
}));

export default function StatusIndicator(props) {
    const classes = useStyles();
    const statusTextDictPicker = {
        available: 'The product is available',
        'waiting-for-reservation': 'Awaiting for the giver to confirm your reservation',
        reserved: 'Awaiting validation of the exchange',
        given: 'Awaiting your notation',
        archived: 'Archived product'
    }
    const statusTextDictGiver = {
        available: 'The product is available',
        'waiting-for-reservation': 'Awaiting for your confirmation',
        reserved: 'Awaiting validation of the exchange',
        given: 'Awaiting the picker notation',
        archived: 'Archived product'

    }

    const buildStatusText = (isOwner, status) => {
        if (isOwner)
            return statusTextDictGiver[status]
        else
            return statusTextDictPicker[status]
    }

    return (
        <div className={classes.main}>
            <span className="textMedium">
                {buildStatusText(props.isOwner, props.status)}
            </span>
        </div>
    );
}
