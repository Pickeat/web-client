import React, {useEffect} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    backgroundContainer: {
        zIndex: '-1',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        overflowY: 'hidden',
        // background: "rgb(16,134,135) linear-gradient(0deg, rgba(16,134,135,1) 0%, rgba(64,210,27,1) 100%)",
        background: '#F9FAFB'
    },
    background: {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
    },
}));

export default function Background(props) {
    const classes = useStyles();

    useEffect(() => {
    }, []);

    return (
        <div className={classes.backgroundContainer}>
            {props.src &&
            <img className={classes.background}
                 src={props.src}
                 alt={'background'}/>
            }
        </div>
    );
}

Background.propTypes = {
    src: PropTypes.string,
};
